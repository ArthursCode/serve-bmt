import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {SharedModule} from '../shared.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ChangePasswordComponent
  ]
})
export class PublicModule { }
