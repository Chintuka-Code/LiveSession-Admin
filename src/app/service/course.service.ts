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
}
