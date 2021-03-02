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
      },
      err => {
        this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
          this.toastr.error(text);
        });
      }
    );
  }

  initAuthEmployeeForm(data) {
    this.authEmployeeForm = this.fb.group({
      username: [data ? data.username : '', [Validators.required]],
      password: [data ? data.password : '', [Validators.required]]
    });
  }

  setFieldsFocused(){
    this.usernameRef.nativeElement.focus();
    this.usernameRef.nativeElement.blur();
    this.passwordRef.nativeElement.focus();
    this.passwordRef.nativeElement.blur();
  }
  saveAuth() {
    this.setFieldsFocused();
    if (!this.authEmployeeForm.valid){
      return;
    }
    this.onSave.emit();
  }

}
