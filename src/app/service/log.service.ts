import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LOG } from '../Interface/log';
import { HTTP_Response } from '../Interface/http_response';
@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private http: HttpClient) {}

  create_log(data: LOG): Promise<HTTP_Response<LOG>> {
    return this.http
      .post<HTTP_Response<LOG>>(
        `${environment.BASE_SERVER_URL}/log/create-log`,
        { data }
      )
      .toPromise();
  }
}
