import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firebase_store: AngularFirestore,
    private firebase_auth: AngularFireAuth,
    private http: HttpClient
  ) {}
  timestamp = firebase.firestore.FieldValue.serverTimestamp();
  user_authentication(data) {
    return this.firebase_auth.createUserWithEmailAndPassword(
      data.email,
      data.password
    );
  }

  create_user(data) {
    // return this.firebase_store.collection('user').doc(id).set(data);
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/create-user`,
      data
    );
  }

  login(data) {
    return this.http.post(`${environment.BASE_SERVER_URL}/user/login`, data);
  }

  get_user_details() {
    return this.http.get(`${environment.BASE_SERVER_URL}/user/admin-accounts`);
  }

  get_students_details() {
    return this.firebase_store
      .collection('user', (ref) => ref.where('user_type', '==', 'Students'))
      .get();
  }

  get_user_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/user/get-user-id/${id}`
    );
  }

  update_user_by_id(data, id) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/update-user-id/${id}`,
      data
    );
  }

  add_admin_into_batch(batch, id) {
    return this.firebase_store
      .collection('user')
      .doc(id)
      .update({ batch_ids: batch });
  }

  get_all_admin_account() {
    return this.firebase_store
      .collection('user', (ref) =>
        ref.where('permissions', 'array-contains', 'LS00')
      )
      .get();
  }

  update_password(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/user/update-password`,
      data
    );

    // try {
    //   const cpUser = firebase.auth().currentUser;
    //   const credentials = firebase.auth.EmailAuthProvider.credential(
    //     localStorage.getItem('email'),
    //     data.old_password
    //   );
    //   await cpUser.reauthenticateWithCredential(credentials);
    //   await cpUser.updatePassword(data.new_password);
    //   return 'password update';
    // } catch (error) {
    //   throw new Error(error);
    // }
  }
}
