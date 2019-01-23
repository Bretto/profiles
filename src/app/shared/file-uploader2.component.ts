import {
  Component,
  OnInit,
  Input,
  ViewChild, forwardRef,
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as _ from 'lodash';


export interface FileUpload {
  file: File;
  size: string;
  extErr?: boolean;
  sizeErr?: boolean;
}

export function createMaxSizeValidator(maxSize) {
  return function validateMaxSize(c: FormControl) {
    if (c.value && maxSize) {
      return c.value.reduce((acc, curr) => {
        if (curr.file.size > maxSize * 1024000) {
          acc = {sizeErr: true};
        }
        return acc;
      }, null);
    }
  };
}

export function createExtensionsValidator(allowedExt) {
  return function validateExtensions(c: FormControl) {
    if (c.value && allowedExt) {
      return c.value.reduce((acc, curr) => {
        if (!allowedExt.toLowerCase().includes(curr.file.name.split('.').pop().toLowerCase())) {
          acc = {extErr: true};
        }
        return acc;
      }, null);
    }
  };
}


@Component({
  selector: 'file-uploader2',
  template:
      `
    <input #uploader
           type="file"
           style="display: none"
           (change)="change($event)"
           title="Select file"
           [attr.multiple]="multiple ? true : null"/>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploader2Component),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploader2Component),
      multi: true
    }
  ]
})
export class FileUploader2Component implements OnInit, ControlValueAccessor {

  @ViewChild('uploader') uploader;

  @Input() maxSize: number;
  @Input() extentions: string;
  @Input() multiple: boolean;

  files: FileUpload[] = [];

  onChange;
  onTouched;
  validateFn;

  constructor() {

  }


  ngOnInit() {

    const validatorFns: any = {};
    if (this.maxSize) validatorFns.maxSize = createMaxSizeValidator(this.maxSize);
    if (this.extentions) validatorFns.extentions = createExtensionsValidator(this.extentions);

    // aggregates the validators errors to a single object
    function createMultiValidator() {
      return function multiValidator(c: FormControl) {
        return _.reduce(validatorFns, (acc, fn) => {
          acc = {...acc, ...fn(c)};
          return acc;
        }, {});
      };
    }

    // register the all the validators into a single function with a single error result
    this.validateFn = createMultiValidator();
  }

  // ControlValueAccessor interface called by Ng
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // ControlValueAccessor interface called by Ng
  validate(c: FormControl) {
    return this.validateFn(c);
  }

  // ControlValueAccessor interface to write initial value to screen (no init val in our case)
  writeValue(value) {}

  // ControlValueAccessor interface called by Ng
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }


  // TODO DnD (Drag and Drop)
  // call updateFiles with the selected files
  change(event: any) {

    const fileList = Array.from(event.target.files);
    const allowedExt = this.extentions || null;
    const maxSize = 1024000 * (this.maxSize || Number.MAX_VALUE);

    if (fileList.length > 0) {

      const files: FileUpload[] = fileList
        .map((file: any) => ({file, size: this.convertSize(file.size)}))
        .map(data => ({...data, extErr: !this.allowedExt(data.file, allowedExt)}))
        .map(data => ({...data, sizeErr: !this.allowedSize(data.file, maxSize)}));

      this.updateFiles(files);
    }
  }

  // remove a file for the list and updates the state of the comp
  removeFile(data) {
    const idx = _.findIndex(this.files, (d) => {
      return data.file.name === d.file.name;
    });

    this.files.splice(idx, 1);
    this.updateFiles(this.files);
  }

  // keeps the files, files, and the form in-sync
  updateFiles(files: FileUpload[]) {
    this.files = files;
    this.onChange(this.files);
  }

  // helper
  convertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  // helper
  getFormData() {
    const formData: FormData = new FormData();

    const files = this.files
      .filter(data => !data.extErr)
      .filter(data => !data.sizeErr);

    if (files.length > 0) {
      files.forEach(data => {
        formData.append('file', data.file, data.file.name);
      });
    }

    return formData;
  }

  // helper
  fileHasUploadError(data) {
    return data.extErr || data.sizeErr;
  }

  // validate extension
  allowedExt(file, allowedExt) {
    if (!allowedExt) return true;
    return allowedExt.toLowerCase().includes(file.name.split('.').pop().toLowerCase());
  }

  // validate size
  allowedSize(file, maxSize) {
    return maxSize > file.size;
  }

  // open the browse window
  browseFiles() {
    this.uploader.nativeElement.click();
  }

}



