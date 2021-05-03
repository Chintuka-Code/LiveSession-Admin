import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private firebase_store: AngularFirestore) {}

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  create_course(data) {
    data['created_at'] = this.timestamp;
    return this.firebase_store.collection('course').add(data);
  }

  get_all_course() {
    return this.firebase_store
      .collection('course', (ref) => ref.where('disabled', '==', false))
      .get();
  }

  get_all_disabled_course() {
    return this.firebase_store
      .collection('course', (ref) => ref.where('disabled', '==', true))
      .get();
  }

  disabled_course(data) {
    return this.firebase_store
      .collection('course')
      .doc(data.doc_id)
      .update({ disabled: data.disabled });
  }

  get_course_details_by_id(id) {
    return this.firebase_store.collection('course').doc(id).get();
  }

  update_course(data, id) {
    return this.firebase_store.collection('course').doc(id).update(data);
  }
}
