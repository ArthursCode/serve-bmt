import {Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {
  @ViewChild('depName') depNameRef: ElementRef;
  onSave = new EventEmitter();
  editDepartmentForm: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initEditDepartmentForm(this.data);
  }

  initEditDepartmentForm(data) {
    this.editDepartmentForm = this.fb.group({
      name: [data ? data.name : '', [Validators.required]],
    });
  }

  setFieldsFocused(){
    this.depNameRef.nativeElement.focus();
    this.depNameRef.nativeElement.blur();
  }

  editDepartment() {
    this.setFieldsFocused();
    if (!this.editDepartmentForm.valid){
      return;
    }
    this.onSave.emit(this.editDepartmentForm.value);
  }

}
