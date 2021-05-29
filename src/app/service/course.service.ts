import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private firebase_store: AngularFirestore,
    private http: HttpClient
  ) {}

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  create_course(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/course/create-course`,
      { data }
    );
  }

  get_all_course(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/course/get-course/enable/${type}`
    );
  }

  change_status(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/course/update-status`,
      { data }
    );
  }

  view_details_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/course/get-course/view-course/${id}`
    );
  }

  edit_course_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/course/get-course/edit-course/${id}`
    );
  }

  update_course(data, id) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/course/upadte-course-details/${id}`,
      { data }
    );
  }
}
