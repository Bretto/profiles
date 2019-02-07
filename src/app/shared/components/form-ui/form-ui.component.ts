import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';


export interface FormResponse {
  isPending?: boolean;
  errorMsg?: any;
  successMsg?: any;
}


@Component({
  selector: 'app-form-ui',
  templateUrl: './form-ui.component.html',
  styleUrls: ['./form-ui.component.scss']
})
export class FormUiComponent implements OnInit {

  isPending: boolean;
  errorMsg: string;
  successMsg: string;

  @Input() formRes: EventEmitter<any>;

  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private form: ControlContainer, private route: ActivatedRoute) { }

  ngOnInit() {

    // this.formRes.subscribe((res: FormResponse) => {
    //   const {isPending, errorMsg, successMsg} = res;
    //   this.isPending = isPending;
    //   this.errorMsg = errorMsg;
    //   this.successMsg = successMsg;
    // });
  }

  onSubmit() {
    this.submit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  get isEditing() {
    return !!this.route.snapshot.params.id;
  }

}
