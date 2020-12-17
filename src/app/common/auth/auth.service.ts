import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient,
              private router: Router) {
    this.startListening();
  }

  registerUser(user) {
    return this.http.post<any>(`${this.API_URL}/api/v1/user/register`, user);
  }

  loginUser(user) {
    return this.http.post<any>(`${this.API_URL}/api/v1/user/login`, user);
  }

  resetPassword(user) {
    return this.http.post<any>(`${this.API_URL}/api/v1/user/reset-password`, user);
  }

  changePassword(reqObj) {
    return this.http.put<any>(`${this.API_URL}/api/v1/user/change-password`, reqObj);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  startListening(): void {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  storageEventListener(event) {
    if (event.key === 'token' && !event.newValue) {
      this.logoutUser();
    }
    if (event.key === 'token' && event.newValue) {
      location.reload();
    }
  }
}
