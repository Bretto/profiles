import * as functions from 'firebase-functions';
import * as Storage from '@google-cloud/storage';

const gcs = new Storage.Storage();

import {tmpdir} from 'os';
import {join, dirname} from 'path';

import * as sharp from 'sharp';
import * as fs from 'fs-extra';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

export const generateThumbs = functions.storage
  .object()
  .onFinalize(async (object: any) => {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name as string;
    const fileName = filePath.split('/').pop() as string;
    const bucketDir = dirname(filePath);
    // const userId = filePath.split('/')[0]; // maybe look into the auth user id instead
    const profileId = filePath.split('/')[1];


    const workingDir = join(tmpdir(), `thumbs/${fileName}`);
    const tmpFilePath = join(workingDir, 'source.png');

    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
      console.log('exiting function');
      return false;
    }

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir);

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

    // 3. Resize the images and define an array of upload promises
    const sizes = [1000, 375];

    const uploadPromises = sizes.map(async size => {
      const thumbName = `thumb@${size}_${fileName}`;
      const thumbPath = join(workingDir, thumbName);

      // Resize source image
      await sharp(tmpFilePath)
        .rotate()
        .resize(size, null)
        .toFile(thumbPath);

      // Upload to GCS
      return bucket.upload(thumbPath, {
        destination: join(bucketDir, thumbName)
      }).then(res => {
        const config: any = {
          action: 'read',
          expires: '03-01-2500',
        };
        const thumbFile = bucket.file(join(bucketDir, thumbName));
        return thumbFile.getSignedUrl(config);
      })
        .then(thumbUrl => {
          return thumbUrl[0];
        });
    });

    // 4. Run the upload operations
    await Promise.all(uploadPromises).then(imgs => {
      const db = admin.firestore();
      return db.doc(`profile/${profileId}`).update({pic: {source: imgs[0], thumb: imgs[1]}})
    });

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    return fs.remove(workingDir);
  });

