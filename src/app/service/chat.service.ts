import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  get_batch_chat(batch_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/get-chat-by-batchID/${batch_id}`
    );
  }

  get_batch_chat_manager_view(batch_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/get-chat-by-batchID/manager-view/${batch_id}`
    );
  }

  get_selected_studentChat(chat_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/get-chat-by-id/${chat_id}`
    );
  }

  get_chat_message_trainer_mode(batch_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/get-chat-trainer-mode/${batch_id}`
    );
  }

  get_chat_batch_admin(batch_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/end-chats-admin/${batch_id}`
    );
  }
}
