import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomFieldsService {
  constructor(private http: HttpClient) {}

  create_custom_fields(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/custom/create-custom-fields`,
      { data }
    );
  }

  get_custom_fields(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/custom/get-custom-fields/${type}`
    );
  }

  update_status(data) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/custom/update-fields-status`,
      { data }
    );
  }

  get_fields_for_tables(type) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/custom/feilds-for-tables/${type}`
    );
  }
}
