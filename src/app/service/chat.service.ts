import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firebase_store: AngularFirestore) {}

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  get_active_chat(user_id, batch_id) {
    return this.firebase_store
      .collection('chat', (ref) =>
        ref
          .where('batch_id', '==', batch_id)
          .orderBy('admin_unread_count', 'desc')
      )
      .snapshotChanges();
  }

  get_chat_message(chat_id) {
    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .collection('chat_message', (ref) =>
        ref.orderBy('created_at', 'desc').limit(30)
      )
      .valueChanges();
  }

  get_chat_all_message(chat_id) {
    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .collection('chat_message', (ref) => ref.orderBy('created_at', 'desc'))
      .valueChanges();
  }

  assign_chat_admin(chat_id, admin_id) {
    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .update({ sme_id: admin_id });
  }

  update_chat_counter(chat_id, count) {
    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .update({ student_unread_count: count, admin_unread_count: 0 });
  }

  create_chat_message(message, chat_id) {
    message['created_at'] = this.timestamp;

    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .collection('chat_message')
      .add(message);
  }

  end_chat(chat_id) {
    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .update({ sme_id: null, admin_unread_count: 0, student_unread_count: 0 });
  }

  end_all_chat(data) {
    return this.firebase_store
      .collection('chat')
      .doc(data.doc_id)
      .update({ sme_id: null, admin_unread_count: 0, student_unread_count: 0 });
  }
}
