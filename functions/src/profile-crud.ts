import * as functions from 'firebase-functions';

functions.database.ref('/profile/{profileId}').onWrite(event => {

});
