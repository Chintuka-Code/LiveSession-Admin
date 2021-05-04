import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(
    private firebase_store: AngularFirestore,
    private firebase_auth: AngularFireAuth
  ) {}
  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  user_authentication(data) {
    return this.firebase_auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
  }

  create_student(data, id) {
    data.createdAt = this.timestamp;
    return this.firebase_store.collection('student').doc(id).set(data);
  }

  get_student_details() {
    return this.firebase_store
      .collection('student', (ref) => ref.where('disabled', '==', false))
      .get();
  }

  get_student_by_id(id) {
    return this.firebase_store.collection('student').doc(id).get();
  }

  get_unassigned_batch_students() {
    return this.firebase_store
      .collection('student', (ref) => ref.where('batch_ids', '==', []))
      .get();
  }

  add_student_into_batch(data) {
    return this.firebase_store
      .collection('student')
      .doc(data.doc_id)
      .update({ batch_ids: data.batch_ids });
  }
}
