import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../common/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  focus;
  focus1;
  token;
  changePasswordForm: any;
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private translate: TranslateService) {

  }

  ngOnInit() {
    this.initChangePasswordForm();
    this.route.params.subscribe((data) => {
      if (data) {
        if (data.id) {
          this.token = data.id;
        }
      }
    });
  }

  initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  changePassword() {
    const reqObj = {token: this.token, ...this.changePasswordForm.value};
    this.auth.changePassword(reqObj)
      .subscribe(
        res => {
          this.translate.get(res.message || 'SUCCESS').subscribe((text: string) => {
            this.toastr.success(text);
          });
          this.changePasswordForm.reset();
        },
        err => {
          this.translate.get(err.error.message || 'ERROR').subscribe((text: string) => {
            this.toastr.error(text);
          });
        }
      );
  }

  toSignIn() {
    this.router.navigate(['/sign-in']);
  }

}
