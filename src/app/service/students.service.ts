import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(
    private firebase_store: AngularFirestore,
    private firebase_auth: AngularFireAuth,
    private http: HttpClient
  ) {}
  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  user_authentication(data) {
    // return this.firebase_auth.createUserWithEmailAndPassword(
    //   data.email,
    //   data.password
    // );
    return firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
  }

  log(data) {
    return firebase.auth().signOut();
  }

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
}
