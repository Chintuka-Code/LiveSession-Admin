import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  create_single_student(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/student/create-student`,
      { data }
    );
  }

  get_student_details(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/student/get-all-student/${type}`
    );
  }

  get_student_details_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/student/get-student-details/${id}`
    );
  }

  get_unassigned_batch_students() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/student/get-unassigned_batch_students`
    );
  }

  add_student_into_batch(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/student/assign-batch-to-student`,
      { data }
    );
  }

  bulk_student_registration(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/student/bulk-registration-student`,
      { data }
    );
  }

  total_student() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/student/total-active-students`
    );
  }

  get_student_details_upadte(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/student/get-student-details-update/${id}`
    );
  }

  update_student_profile(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/student/update-student-profile`,
      { data }
    );
  }

  reset_password(student) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/student/reset-student-password`,
      { data: student }
    );
  }

  get_student_batch(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/student/get-student-batch/${id}`
    );
  }

  change_batch(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/student/change-batch`,
      { data }
    );
  }
}
