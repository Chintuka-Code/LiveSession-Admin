import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  timestamp = firebase.firestore.FieldValue.serverTimestamp();
  constructor(private firebase_store: AngularFirestore) {}

  create_subject(data) {
    data['created_at'] = this.timestamp;
    data['disabled'] = false;
    return this.firebase_store.collection('subject').add(data);
  }

  get_all_subject() {
    return this.firebase_store
      .collection('subject', (ref) => ref.where('disabled', '==', false))
      .get();
  }

  get_all_disabled_subject() {
    return this.firebase_store
      .collection('subject', (ref) => ref.where('disabled', '==', true))
      .get();
  }

  update_subject(data) {
    return this.firebase_store
      .collection('subject')
      .doc(data.doc_id)
      .update({ subject_name: data.subject_name });
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
