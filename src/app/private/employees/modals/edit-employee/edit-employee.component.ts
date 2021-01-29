import { Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {EmployeesService} from '../../employees.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../../../expenses/daily-costs/staff/staff.component';
import * as _moment from 'moment';
import {createEmptyFile} from '../../../../common/functions/file-operations';
import {drawImage} from '../../../../common/functions/image-operations';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class EditEmployeeComponent implements OnInit {
  @ViewChild('fullName') fullNameRef: ElementRef;
  @ViewChild('birthDate') birthDateRef: ElementRef;
  @ViewChild('image') imageRef: ElementRef<HTMLElement>;
  images: File[] = [];
  files = [];
  editEmployeeForm: any;
  maxDate = new Date();

  genders = [
    {key: 'male', label: 'Male'},
    {key: 'female', label: 'Female'},
    {key: 'other', label: 'Other'}
  ];
  roles = [
    {key: 'employee', label: 'No Role'},
    {key: 'accountant', label: 'Accountant'},
    {key: 'hr', label: 'HR Role'},
    {key: 'chief', label: 'Chief'}
  ];

  params = {
    gender: '',
    role: ''
  };

  onSave = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private employeesService: EmployeesService,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initEditEmployeeForm(this.data);
    this.getImage(this.data.avatarUrl);
    this.getFiles(this.data.fileUrls);
  }

  initEditEmployeeForm(data) {
    this.editEmployeeForm = this.fb.group({
      avatarUrl: [data ? data.avatarUrl : ''],
      full_name: [data ? data.full_name : '', [Validators.required]],
      birth_date: [data ? this.getDate(data.birth_date) : '', [Validators.required, Validators.minLength(1)]],
      gender: [data ? data.gender : this.genders[0]],
      phone: [data ? data.phone : ''],
      email: [data ? data.email : '', [Validators.email, Validators.minLength(6)]],
      position: [data ? data.position : ''],
      salary: [data ? data.salary : ''],
      role: [data ? data.role : this.roles[0]],
      fileUrls: [data ? data.fileUrls : []]
    });
  }
  saveEmployee() {
    this.setFieldsFocused();
    if (!this.editEmployeeForm.valid){
      return;
    }
    this.onSave.emit(this.editEmployeeForm.value);
  }
  setFieldsFocused(){
    this.fullNameRef.nativeElement.focus();
    this.fullNameRef.nativeElement.blur();
    this.birthDateRef.nativeElement.focus();
    this.birthDateRef.nativeElement.blur();
  }

  getImage(logoUrl) {
    if (logoUrl) {
      this.images = [createEmptyFile('avatar')];
      drawImage('editEmployeeImg', logoUrl);
    }
  }

  getFiles(filesArray) {
    if (filesArray && filesArray.length > 0){
      filesArray.map(file => {
        this.files.push({file: createEmptyFile(file.name), url: file.url});
      });
    }
  }

  onSelectImage(event) {
    if (!event.addedFiles[0]) {
      return;
    }
    this.images = [event.addedFiles[0]];
    const formData = new FormData();
    formData.append('avatar', this.images[0]);
    this.employeesService.postUploadAvatar(formData).subscribe(
      res => {
        this.editEmployeeForm.get('avatarUrl').setValue(res.avatarUrl);
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  onSelectFiles(event) {
    if (this.files.length >= 3){
      return;
    }
    const formData = new FormData();
    formData.append('file', event.addedFiles[0]);
    this.employeesService.postUploadFile(formData).subscribe(
      res => {
        this.files.push({file: event.addedFiles[0], url: res.fileUrl});
        this.editEmployeeForm.get('fileUrls').setValue(this.files.map(el => ({url: el.url, name: el.file.name})));
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  onRemoveImage(event) {
    this.images.splice(this.images.indexOf(event), 1);
    this.editEmployeeForm.get('avatarUrl').setValue('');
  }
  onRemoveFile(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.editEmployeeForm.get('fileUrls').setValue(this.files.map(el => ({url: el.url, name: el.file.name})));
  }

  getDate(dateOfBirth) {
    return _moment(dateOfBirth, 'MM-DD-YYYY').toDate() || '';
  }
}
