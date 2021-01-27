import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../common/auth/auth.service';
import {GlobalService} from '../../common/global/global.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in-employee',
  templateUrl: './sign-in-employee.component.html',
  styleUrls: ['./sign-in-employee.component.scss']
})
export class SignInEmployeeComponent implements OnInit {

  focus;
  focus1;
  signInEmployeeForm: any;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initSignInEmployeeForm();
  }

  initSignInEmployeeForm() {
    this.signInEmployeeForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      key: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signInAsEmployee() {
    this.auth.loginEmployee(this.signInEmployeeForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/welcome']);
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
            this.toastr.error(text);
          });
        }
      );
  }
}
