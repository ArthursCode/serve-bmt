import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  userData: any;
  API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) {
    this.userData = new BehaviorSubject({});
  }

  setUserData(data) {
    this.userData.next(data);
  }

  getUserData() {
    return this.http.get<any>(`${this.API_URL}/api/v1/user-settings`);
  }
}
