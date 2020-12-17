import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../common/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  focus;
  focus1;
  focus2;
  focus3;
  signUpForm: any;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit() {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signUp() {
    this.auth.registerUser(this.signUpForm.value)
      .subscribe(
        res => {
          this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
            this.toastr.success(text);
          });
          this.signUpForm.reset();
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
            this.toastr.error(text);
          });
        }
      );
  }

}
