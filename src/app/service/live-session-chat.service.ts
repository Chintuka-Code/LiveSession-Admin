import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LiveSessionChatService {
  private socket: any;
  constructor() {
    this.socket = io(environment.BASE_SERVER_URL, {
      upgrade: false,
      transports: ['websocket'],
    });
  }

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
    this.socket.disconnect(() => {
      this.socket.removeAllListeners();
    });
  }

  remove_listen() {
    this.socket.removeAllListeners();
  }

  leave(data) {
    this.socket.emit('leave', data);
  }

  update_notification(data) {
    this.socket.emit('update-notification-read', data);
  }

  user_status(user) {
    this.socket.emit('user-status', user);
  }

  new_message_received() {
    return new Observable<any>((observer) => {
      this.socket.on('new message', (res, chat) => {
        const data = {
          message: res,
          chat: chat,
        };
        observer.next(data);
      });
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

  new_ticket() {
    return new Observable<any>((observer) => {
      this.socket.on('ticket-notification', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  new_reply_ticket() {
    return new Observable<any>((observer) => {
      this.socket.on('new-reply-ticket', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  update_notification_list() {
    return new Observable<any>((observer) => {
      this.socket.on('upadte-notification-list', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  new_chat() {
    return new Observable<any>((observer) => {
      this.socket.on('new-chat-assign', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  update_user() {
    return new Observable<any>((observer) => {
      this.socket.on('update-user-status', (data) => observer.next(data));
      return () => this.socket.disconnect();
    });
  }

  ticket_reply(message, room, uid) {
    this.socket.emit('ticket-reply', message, room, uid);
  }
}
