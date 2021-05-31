import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(
    private firebase_store: AngularFirestore,
    private http: HttpClient
  ) {}

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  create_batch(data) {
    return this.http.post(`${environment.BASE_SERVER_URL}/batch/create-batch`, {
      data,
    });
  }

  get_all_batch(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-batch/enable/${type}`
    );
  }

  change_batch_status(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/batch/update-status`,
      { data }
    );
  }

  get_batch_details_by(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/view-batch-details/${id}`
    );
  }

  get_batch_details_for_addStudent(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/batch-details-for-add-student/${id}`
    );
  }

  get_edit_batch_details_by_id(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/batch/get-edit-batch-details/${id}`
    );
  }

  update_batch_details(data) {
    return this.firebase_store
      .collection('batch')
      .doc(data.batch_id)
      .update(data);
  }
}
