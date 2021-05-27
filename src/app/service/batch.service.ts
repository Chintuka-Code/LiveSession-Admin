import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private firebase_store: AngularFirestore) {}

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  create_batch(data) {
    data['created_at'] = this.timestamp;
    return this.firebase_store.collection('batch').add(data);
  }

  get_all_enable_batch() {
    return this.firebase_store
      .collection('batch', (ref) => ref.where('disabled', '==', false))
      .get();
  }

  get_all_disabled_batch() {
    return this.firebase_store
      .collection('batch', (ref) => ref.where('disabled', '==', true))
      .get();
  }

  disabled_batch(id, status) {
    return this.firebase_store
      .collection('batch')
      .doc(id)
      .update({ disabled: status });
  }

  get_batch_details_by(id) {
    return this.firebase_store.collection('batch').doc(id).get();
  }

  update_batch_details(data) {
    return this.firebase_store
      .collection('batch')
      .doc(data.batch_id)
      .update(data);
  }
}
