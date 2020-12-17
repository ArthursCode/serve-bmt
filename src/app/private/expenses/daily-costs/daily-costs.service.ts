import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DailyCostsService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  postChangeExpenses(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/change-expenses`, data);
  }

  getExpenses(params) {
    return this.http.get<any>(`${this.API_URL}/api/v1/expenses`, {
      params: {
        ...params,
      }
    });
  }

  getExpensesDaily(params) {
    return this.http.get<any>(`${this.API_URL}/api/v1/expenses-daily`, {
      params: {
        ...params,
      }
    });
  }
}
