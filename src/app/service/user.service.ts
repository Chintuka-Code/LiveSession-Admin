import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create_user(data) {
    // return this.firebase_store.collection('user').doc(id).set(data);
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/create-user`,
      data
    );
  }

  login(data) {
    return this.http.post(`${environment.BASE_SERVER_URL}/user/login`, data);
  }

  get_user_details() {
    return this.http.get(`${environment.BASE_SERVER_URL}/user/admin-accounts`);
  }

  get_user_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/user/get-user-id/${id}`
    );
  }

  update_user_by_id(data, id) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/update-user-id/${id}`,
      data
    );
  }

  add_admin_into_batch(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/add-admin-into-batch`,
      { data }
    );
  }

  update_password(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/update-password`,
      data
    );
  }

  get_admin_batch_details() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/user/get-admin-batch-details`
    );
  }

  get_all_admin() {
    return this.http.get(`${environment.BASE_SERVER_URL}/user/get-admin-list`);
  }

  admins_chats() {
    return this.http.get(`${environment.BASE_SERVER_URL}/user/admins/status`);
  }
}
