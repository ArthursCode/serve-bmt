import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }


  postUploadAvatar(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-avatar`, data);
  }
  postUploadFile(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-file`, data);
  }
}
