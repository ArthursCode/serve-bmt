import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  postChangeUserSettings(data) {
    return this.http.put<any>(`${this.API_URL}/api/v1/change-user-settings`, data);
  }

  postUploadLogo(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-logo`, data);
  }

  getUserSettings() {
    return this.http.get<any>(`${this.API_URL}/api/v1/user-settings`);
  }
}
