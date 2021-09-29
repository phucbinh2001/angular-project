import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Subject } from 'rxjs';

export class BaseHttpService {
  private http: HttpClient;

  constructor(_http: HttpClient) {
    this.http = _http;
  }

  async post<T>(url: string, data: any, headers: any = {}) {
    const response = await this.http
      .post<T>(url, data, {
        headers: {
          ...headers
        }
      })
      .toPromise();

    return response;
  }
}
