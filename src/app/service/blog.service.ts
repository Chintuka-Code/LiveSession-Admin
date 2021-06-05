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

  get_blog(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/blog/get-all-blog/${type}`
    );
  }

  published_unpublished_blog(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/blog/published-unpublished`,
      { data }
    );
  }

  get_blog_details_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/blog/blog-details/${id}`
    );
  }

  update_blog(data) {
    return this.http.post(`${environment.BASE_SERVER_URL}/blog/update-blog`, {
      data,
    });
  }
}
