import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  create_category(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/category/create-category`,
      { data }
    );
  }
}
