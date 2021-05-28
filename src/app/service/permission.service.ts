import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormativeData } from '../utilities/formative_data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(
    private firebase_store: AngularFirestore,
    private http: HttpClient
  ) {}

  get_all_permission() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/permission/all-permission`
    );
  }

  check_role(role) {
    return new Promise((resolve, reject) => {
      this.firebase_store
        .collection('user', (ref) =>
          ref
            .where('email', '==', localStorage.getItem('email'))
            .where('permissions', 'array-contains', role)
        )
        .get()
        .subscribe((res: any) => {
          const data = FormativeData.format_firebase_get_request_data(res);
          if (data.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
