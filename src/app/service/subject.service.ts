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
    return this.firebase_store.collection('subject').add(data);
  }

  get_all_subject() {
    return this.firebase_store.collection('subject').get();
  }

  update_subject(data) {
    return this.firebase_store
      .collection('subject')
      .doc(data.doc_id)
      .update({ subject_name: data.subject_name });
  }
}
