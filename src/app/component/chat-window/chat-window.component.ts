import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AttachmentService } from 'src/app/service/attachment.service';
import { ChatService } from 'src/app/service/chat.service';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {
  @Input() chat: any;
  spinner: boolean = false;
  chats: any[] = [];
  student_message: any[] = [];
  @ViewChild('sound') sound: ElementRef;
  admin_id: string;
  files: any[] = [];

  constructor(
    private chat_service: ChatService,
    private router: Router,
    private user_service: UserService,
    private attachment_service: AttachmentService,
    private live_session_chat_service: LiveSessionChatService
  ) {
    this.admin_id = localStorage.getItem('uid');

    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      this.sound.nativeElement.pause();
      this.sound.nativeElement.currentTime = 0;
      if (res.sender_type !== 'admin') {
        this.sound.nativeElement.play();
      }
      console.log(res);
      const index = this.chats.findIndex(
        (ch) => ch.chat._id == res.chat.chat_id
      );
      console.log(index);
      if (index > -1) {
        this.chats[index].message.push(res.message);
      }

      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
    });
  }

  get_student_chat() {
    this.spinner = true;
    if (this.chat.sme_id === localStorage.getItem('uid')) {
      this.live_session_chat_service.join_room({
        room_id: this.chat.student_id + this.chat.batch_id,
      });
    }

    this.chat_service.get_selected_studentChat(this.chat._id).subscribe(
      (res: any) => {
        const response = res.data;
        this.student_message = response.message;
        this.chats.push({ chat: this.chat, message: this.student_message });
        setTimeout(() => {
          this.scroll_chat_container();
        }, 50);
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  findIndex(chat) {
    return this.chats.findIndex((ch) => ch.chat._id == chat._id);
  }

  scroll_chat_container() {
    const div = document.querySelectorAll(`.chat-body`);
    if (div != null) {
      div.forEach((element) => {
        element.scrollTop = element.scrollHeight - element.clientHeight;
      });
    } else {
      setTimeout(() => {
        this.scroll_chat_container();
      }, 200);
    }
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  // attachment
  attchment(event) {
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  async send_message(chat) {
    const message_obj = {
      text_message: 'This is spam message to chat 01s ',
      sme_id: localStorage.getItem('uid'),
      sender_name: localStorage.getItem('uid'),
      sender_type: 'admin',
      attachment: [],
      created_at: new Date(),
    };

    const data = {
      room_id: chat.student_id + chat.batch_id,
      chat_id: chat._id,
    };
    // this.text = '';
    try {
      if (this.files.length > 0) {
        const files: any = await this.attachment_service.upload_files(
          this.files
        );
        message_obj['attachment'] = FormativeData.concat_url_with_files(
          files.files_paths
        );
      }
      const index = this.chats.findIndex((ch) => ch.chat._id == chat._id);
      if (index > -1) {
        this.chats[index].message.push(message_obj);
      }
      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
      this.live_session_chat_service.send_message(message_obj, data);

      this.files = [];
      // this.message_sending = false;
    } catch (error) {
      // console.log(error);
    }
  }

  ngOnInit(): void {
    this.get_student_chat();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
}
