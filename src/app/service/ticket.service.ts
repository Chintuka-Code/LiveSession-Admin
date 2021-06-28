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

  get_all_active_ticket(skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/all-active-tickets/${skip}`
    );
  }

  get_all_close_ticket(skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/all-close-tickets/${skip}`
    );
  }

  get_my_category_all_active_ticket(skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/my-category-all-active-tickets/${skip}`
    );
  }

  get_my_category_all_close_ticket(skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/my-category-all-close-tickets/${skip}`
    );
  }

  get_my_active_ticket(skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/active-tickets/${skip}`
    );
  }

  get_my_close_ticket(skip) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/close-tickets/${skip}`
    );
  }

  get_ticket_details(id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/ticket/ticket-details/${id}`
    );
  }

  reply_ticket(data, ticket_id) {
    return this.http.post(
      `${environment.BASE_SERVER_URL}/ticket/reply_ticket/${ticket_id}`,
      { data }
    );
  }
}
