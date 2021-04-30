import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  create_user(data, id) {
    data.createdAt = this.timestamp;
    return this.firebase_store.collection('user').doc(id).set(data);
  }

  login(data) {
    return this.firebase_auth.signInWithEmailAndPassword(
      data.email,
      data.password
    );
  }

  get_user_details() {
    return this.firebase_store
      .collection('user', (ref) => ref.where('user_type', '!=', 'Students'))
      .get();
  }

  get_students_details() {
    return this.firebase_store
      .collection('user', (ref) => ref.where('user_type', '==', 'Students'))
      .get();
  }
}
