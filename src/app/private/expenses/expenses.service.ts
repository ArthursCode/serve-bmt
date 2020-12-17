import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  getExpensesList(params) {
    return this.http.get<any>(`${this.API_URL}/api/v1/expenses-list`, {
      params: {
        ...params,
      }
    });
  }
  removeExpenses(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/remove-expenses`, data);
  }

  getBinExpensesList(params) {
    return this.http.get<any>(`${this.API_URL}/api/v1/expenses-bin-list`, {
      params: {
        ...params,
      }
    });
  }

  removeBinExpenses(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/remove-bin-expenses`, data);
  }

  restoreBinExpenses(data) {
    return this.http.post<any>(`${this.API_URL}/api/v1/restore-bin-expenses`, data);
  }
}
