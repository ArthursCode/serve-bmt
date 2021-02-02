import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  getDepartmentsList(params) {
    const newParams = {
      current: params.current,
      per_page: params.per_page,
      name: params.filters.name || ''
    };
    return this.http.get<any>(`${this.API_URL}/api/v1/departments-list`, {
      params: {
        ...newParams,
      }
    });
  }

  addDepartment(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/add-department`, data);
  }
  editDepartment(data, id) {
    return this.http.post<any>(`${this.API_URL}/api/v1/edit-department/${id}`, data);
  }
  removeDepartment(id) {
    return this.http.delete<any>(`${this.API_URL}/api/v1/remove-department/${id}`);
  }
}
