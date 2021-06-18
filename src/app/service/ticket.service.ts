import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  get_ticket_permission() {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket-permission/all-permission`
    );
  }
}
