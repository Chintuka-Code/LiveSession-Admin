import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { env } from 'process';
@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private http: HttpClient) {}

  create_batch(data) {
    return this.http.post(`${environment.BASE_SERVER_URL}/batch/create-batch`, {
      data,
    });
  }

  get_all_batch(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-batch/enable/${type}`
    );
  }

  change_batch_status(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/batch/update-status`,
      { data }
    );
  }

  get_batch_details_by(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/view-batch-details/${id}`
    );
  }

  get_batch_details_for_addStudent(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/batch-details-for-add-student/${id}`
    );
  }

  get_edit_batch_details_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-edit-batch-details/${id}`
    );
  }

  get_batch_details_home() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-batch-details-home`
    );
  }

  get_student_list(batch_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-batch-student/${batch_id}`
    );
  }

  get_batch_change() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-batch/change`
    );
  }

  get_all_batch_chat() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-all-batch-chat`
    );
  }
}
