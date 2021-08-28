import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  get_all_category() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/category/findAll`
    );
  }

  create_category(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/project/category/create`, {data}
    );
  }

  get_all_project() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/project/findAll`
    );
  }

  create_project(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/project/create`, {data}
    );
  }
}
