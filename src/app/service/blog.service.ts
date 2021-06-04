import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  create_blog(data) {
    return this.http.post(`${environment.BASE_SERVER_URL}/blog/create-blog`, {
      data,
    });
  }
}
