import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LiveSessionChatService {
  constructor() {}

  private socket = io(environment.BASE_SERVER_URL);

  join_room(data) {
    this.socket.emit('join', data);
  }

  send_message(message, data) {
    this.socket.emit('message', message, data);
  }

  assign_chat_to_admin(data) {
    this.socket.emit('assign-chat-to-admin', data);
  }

  end_all_chat(data) {
    this.socket.emit('end-all-chat', data);
  }

  transfer(data) {
    this.socket.emit('transfer', data);
  }

  disconnect() {
    this.socket.disconnect();
  }

  leave(data) {
    this.socket.emit('leave', data);
  }

  new_message_received() {
    return new Observable<any>((observer) => {
      this.socket.on('new message', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  increment_admin_counter() {
    return new Observable<any>((observer) => {
      this.socket.on('increment counter', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  assign_chat() {
    return new Observable<any>((observer) => {
      this.socket.on('assign-chat', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  end_chat() {
    return new Observable<any>((observer) => {
      this.socket.on('end-chat', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  transfer_chat() {
    return new Observable<any>((observer) => {
      this.socket.on('transfer-chat', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }
}
