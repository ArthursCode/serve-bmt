import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {EmployeesService} from '../../employees.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MY_FORMATS} from '../../../expenses/daily-costs/staff/staff.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddEmployeeComponent implements OnInit {
  images: File[] = [];
  files: File[] = [];
  addEmployeeForm: any;
  maxDate = new Date();

  genders = [
    {key: 'male', label: 'Male'},
    {key: 'female', label: 'Female'},
    {key: 'other', label: 'Other'}
  ];
  roles = [
    {key: 'accountant', label: 'Accountant'},
    {key: 'hr', label: 'HR Role'},
    {key: 'chief', label: 'Chief'}
  ];

  params = {
    gender: '',
    role: ''
  };

  onSave = new EventEmitter();

  constructor(private fb: FormBuilder,
              private employeesService: EmployeesService,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initAddEmployeeForm();
  }
  initAddEmployeeForm() {
    this.addEmployeeForm = this.fb.group({
      avatarUrl: [''],
      full_name: ['', [Validators.required, Validators.minLength(3)]],
      birth_date: ['', [Validators.required, Validators.minLength(3)]],
      gender: [this.genders[0]],
      phone: [''],
      email: [''],
      position: ['', [Validators.required, Validators.minLength(3)]],
      salary: [''],
      role: [this.roles[0]],
      fileUrls: [[]]
    });
  }
  saveEmployee() {
    console.log(this.addEmployeeForm.value);
    // this.onSave.emit();
  }

  onSelectImage(event) {
    this.images = [event.addedFiles[0]];
    const formData = new FormData();
    formData.append('avatar', this.images[0]);
    console.log(formData);
    this.employeesService.postUploadAvatar(formData).subscribe(
      res => {
        this.addEmployeeForm.get('avatarUrl').setValue(res.avatarUrl);
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
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append('file', event.addedFiles[0]);
    this.employeesService.postUploadFile(formData).subscribe(
      res => {
        console.log(res);
        // this.addEmployeeForm.get('fileUrls').setValue(res.logoUrl);
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
    this.addEmployeeForm.get('avatarUrl').setValue('');
  }
  onRemoveFile(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
