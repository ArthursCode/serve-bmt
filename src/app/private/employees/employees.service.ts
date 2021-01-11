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


  addEmployee(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/add-employee`, data);
  }
  removeEmployee(data) {
    // return this.http.delete<any>(`${this.API_URL}/api/v1/remove-employee`, data);
  }
  editEmployee(data) {
    // return this.http.post<any>(`${this.API_URL}/api/v1/edit-employee`, data);
  }
  viewEmployee(data) {
    // return this.http.post<any>(`${this.API_URL}/api/v1/view-employee`, data);
  }
  postUploadAvatar(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-avatar`, data);
  }
  postUploadFile(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-file`, data);
  }
}
