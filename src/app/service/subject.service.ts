import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private http: HttpClient) {}

  create_subject(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/subject/create-subject`,
      { data }
    );
  }

  get_subject(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/subject/all-subject/enable/${type}`
    );
  }

  update_subject(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/subject/update-subject`,
      { data }
    );
  }
}
