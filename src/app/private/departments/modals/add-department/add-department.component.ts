import {Component, ElementRef, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  @ViewChild('depName') depNameRef: ElementRef;
  addDepartmentForm: any;
  onSave = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initAddDepartmentForm();
  }

  initAddDepartmentForm() {
    this.addDepartmentForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  saveDepartment() {
    this.setFieldsFocused();
    if (!this.addDepartmentForm.valid){
      return;
    }
    this.onSave.emit(this.addDepartmentForm.value);
  }

  setFieldsFocused(){
    this.depNameRef.nativeElement.focus();
    this.depNameRef.nativeElement.blur();
  }

}
