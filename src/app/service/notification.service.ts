import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  get_my_notification(uid, skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/notification/get-my-notification/${uid}/${skip}`
    );
  }
}
