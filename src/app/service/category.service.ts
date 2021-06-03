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

  get_all_category(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/category/get-category/${type}`
    );
  }

  change_category_status(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/category/update-category-status`,
      { data }
    );
  }

  get_category_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/category/get-category-by-id/${id}`
    );
  }

  update_category(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/category/update-category`,
      { data }
    );
  }
}
