import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  constructor(private http: HttpClient) {}

  upload_files(data) {
    let formdata: FormData = new FormData();

    for (var i = 0; i < data.length; i++) {
      formdata.append('files[]', data[i], data[i]['name']);
    }
    return this.http.post(environment.ATTACHMENT_URL, formdata).toPromise();
  }
}
