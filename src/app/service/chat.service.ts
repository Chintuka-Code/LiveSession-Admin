import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private firebase_store: AngularFirestore,
    private http: HttpClient
  ) {}

  timestamp = firebase.firestore.FieldValue.serverTimestamp();

  get_batch_chat(batch_id) {
    // return this.firebase_store
    //   .collection('chat', (ref) =>
    //     ref
    //       .where('batch_id', '==', batch_id)
    //       .orderBy('admin_unread_count', 'desc')
    //   )
    //   .snapshotChanges();

    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/get-chat-by-batchID/${batch_id}`
    );
  }

  get_selected_studentChat(chat_id) {
    return this.http.get(
      `${environment.BASE_SERVER_URL}/chat/get-chat-by-id/${chat_id}`
    );
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

  // for trainer mode
  get_selected_batch_chat(batch) {
    return this.firebase_store
      .collection('chat', (ref) => ref.where('batch_id', '==', batch._id))
      .get();
  }

  get_chat_message_trainer_mode(chat_id) {
    console.log(chat_id);
    return this.firebase_store
      .collection('chat')
      .doc(chat_id)
      .collection('chat_message', (ref) =>
        ref
          .where('sender_type', '==', 'student')
          .orderBy('created_at', 'desc')
          .limit(5)
      )
      .valueChanges();
  }
}
