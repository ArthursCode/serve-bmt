import {Component, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {EmployeesService} from '../../employees.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-auth-employee',
  templateUrl: './auth-employee.component.html',
  styleUrls: ['./auth-employee.component.scss']
})
export class AuthEmployeeComponent implements OnInit {
  @ViewChild('username') usernameRef: ElementRef;
  @ViewChild('password') passwordRef: ElementRef;

  onSave = new EventEmitter();
  authEmployeeForm: any;

  spinGenerate = false;
  spinCopy = false;
  password = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private employeesService: EmployeesService,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initAuthEmployeeForm({});
    this.getAuthData(this.data.id);
  }

  getAuthData(id) {
    this.employeesService.getEmployeeAuth(id).subscribe(
      res => {
        this.initAuthEmployeeForm(res);
        this.password = res.password;
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  initAuthEmployeeForm(employee) {
    this.authEmployeeForm = this.fb.group({
      username: [employee.username ? employee.username : this.data.full_name, [Validators.required]]
    });
  }

  setFieldsFocused(){
    this.usernameRef.nativeElement.focus();
    this.usernameRef.nativeElement.blur();
  }
  saveAuth() {
    this.setFieldsFocused();
    if (!this.authEmployeeForm.valid){
      return;
    }
    this.onSave.emit({password: this.password, ...this.authEmployeeForm.value});
  }

  generatePassword() {
    this.spinGenerate = true;
    this.employeesService.generatePasswordEmployee(this.data.id).subscribe(
      res => {
        this.spinGenerate = false;
        this.password = res.password;
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
          this.spinGenerate = false;
        });
      }
    );

  }
  copyClipBoard() {
    this.spinCopy = true;
    setTimeout(() => {
      this.spinCopy = false;
    }, 300);
  }

}
