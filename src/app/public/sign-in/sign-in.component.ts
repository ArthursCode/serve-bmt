import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../common/auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {GlobalService} from '../../common/global/global.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  focus;
  focus1;
  showForgot = false;
  signInForm: any;
  forgotForm: any;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private globalService: GlobalService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initSignInForm();
    this.initForgotForm();
  }

  initSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  initForgotForm() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  signIn() {
    this.auth.loginUser(this.signInForm.value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.globalService.setUserData(res.user);
          this.router.navigate(['/dashboard']);
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
            this.toastr.error(text);
          });
        }
      );
  }

  sendEmail() {
    this.auth.resetPassword(this.forgotForm.value)
      .subscribe(
        res => {
          this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
            this.toastr.success(text);
          });
          this.forgotForm.reset();
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
            this.toastr.error(text);
          });
        }
      );
  }

}
