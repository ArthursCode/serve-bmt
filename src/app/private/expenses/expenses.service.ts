import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import * as _moment from 'moment';
import {dateFormat} from '../../common/constants/constants';

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
    const newParams = {
      current: params.current,
      per_page: params.per_page,
      math_op: params.filters.math_op.key || '=',
      sum: params.filters.sum,
      start: params.filters.start && _moment(params.filters.start, 'MM-DD-YYYY').format(dateFormat) || '',
      end: params.filters.end && _moment(params.filters.end, 'MM-DD-YYYY').format(dateFormat) || '',
      sub_category: params.filters.sub_category.map(el => {
        return el.key;
      })
    };
    return this.http.get<any>(`${this.API_URL}/api/v1/expenses-list`, {
      params: {
        ...newParams,
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
