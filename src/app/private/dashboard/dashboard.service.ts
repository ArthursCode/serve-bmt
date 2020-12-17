import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable()
export class DashboardService {

  API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) {
  }

  getChartBar(params) {
    return this.http.get<any>(`${this.API_URL}/api/v1/chart-bar`, {
      params: {
        ...params,
      }
    });
  }

  getChartPie(params) {
    return this.http.get<any>(`${this.API_URL}/api/v1/chart-pie`, {
      params: {
        ...params,
      }
    });
  }
}
