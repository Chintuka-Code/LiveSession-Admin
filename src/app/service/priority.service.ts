import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  constructor(private http: HttpClient) {}

  create_priority(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/priority/create-priority`,
      { data }
    );
  }

  get_priority(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/priority/all-priorities/${type}`
    );
  }

  update_status(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/priority/update-priority`,
      { data }
    );
  }
}
