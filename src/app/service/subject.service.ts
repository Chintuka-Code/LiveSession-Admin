import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  timestamp = firebase.firestore.FieldValue.serverTimestamp();
  constructor(
    private firebase_store: AngularFirestore,
    private http: HttpClient
  ) {}

  create_subject(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/subject/create-subject`,
      { data }
    );
  }

  get_subject(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/subject/all-subject/enable/${type}`
    );
  }

  get_all_disabled_subject() {
    return this.firebase_store
      .collection('subject', (ref) => ref.where('disabled', '==', true))
      .get();
  }

  update_subject(data) {
    console.log(data);

    return this.http.post(
      `${environment.BASE_SERVER_URL}/subject/update-subject`,
      { data }
    );
  }

  disabled_subject(data) {
    return this.firebase_store
      .collection('subject')
      .doc(data.doc_id)
      .update({ disabled: data.disabled });
  }

  get_subject_by_id(id) {
    return this.firebase_store.collection('subject').doc(id).get();
  }
}
