import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as _moment from 'moment';
import {dateFormat} from '../../common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  getEmployeesList(params) {
    const newParams = {
      current: params.current,
      per_page: params.per_page,
      math_op: params.filters.math_op.key || '=',
      salary: params.filters.salary || '',
      full_name: params.filters.full_name || '',
      start: params.filters.start && _moment(params.filters.start, 'MM-DD-YYYY').format(dateFormat) || '',
      end: params.filters.end && _moment(params.filters.end, 'MM-DD-YYYY').format(dateFormat) || '',
    };
    return this.http.get<any>(`${this.API_URL}/api/v1/employees-list`, {
      params: {
        ...newParams,
      }
    });
  }

  addEmployee(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/add-employee`, data);
  }
  editEmployee(data, id) {
    return this.http.post<any>(`${this.API_URL}/api/v1/edit-employee/${id}`, data);
  }
  removeEmployee(id) {
    return this.http.delete<any>(`${this.API_URL}/api/v1/remove-employee/${id}`);
  }
  postUploadAvatar(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-avatar`, data);
  }
  postUploadFile(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/upload-file`, data);
  }

  getEmployeeAuth(id) {
    return this.http.get<any>(`${this.API_URL}/api/v1/auth-data/${id}`, );
  }
  setEmployeeAuth(data, id) {
    return this.http.post<any>(`${this.API_URL}/api/v1/set-auth-data/${id}`, data);
  }
  generatePasswordEmployee(id) {
    return this.http.get<any>(`${this.API_URL}/api/v1/generate-password/${id}`, );
  }
}
