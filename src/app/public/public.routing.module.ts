import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {GuestGuard} from '../common/auth/guest.guard';
import {ChangePasswordComponent} from './change-password/change-password.component';

export const publicRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent,
    canActivate: [GuestGuard]
  }
];
