import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { AttachmentService } from 'src/app/service/attachment.service';
import { ChatService } from 'src/app/service/chat.service';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {
  @Input() chat: any;
  @Input() index: any;
  @Output() onMessageSend: EventEmitter<any> = new EventEmitter();
  spinner: boolean = true;
  student_message: any[] = [];
  @ViewChild('sound') sound: ElementRef;
  admin_id: string;
  files: any[] = [];
  message_sending: boolean = false;
  admin: any;

  constructor(
    private chat_service: ChatService,
    private router: Router,
    private user_service: UserService,
    private attachment_service: AttachmentService,
    private live_session_chat_service: LiveSessionChatService
  ) {
    this.admin_id = localStorage.getItem('uid');
    this.admin = ACTIVE_USER();

    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      this.sound.nativeElement.pause();
      this.sound.nativeElement.currentTime = 0;
      if (res.sender_type !== 'admin') {
        this.sound.nativeElement.play();
      }
      // console.log(res);
      // const index = this.chats.findIndex(
      //   (ch) => ch.chat._id == res.chat.chat_id
      // );
      // console.log(index);
      // if (index > -1) {
      //   this.chats[index].message.push(res.message);
      // }

      this.student_message.push(res.message);

      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
    });
  }

  findIndex(chat) {
    // return this.chats.findIndex((ch) => ch.chat._id == chat._id);
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
    // console.log(this.chats);
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  async send_message(message) {
    console.log(this.index);

    // if (message.value == '' && this.files.length == 0) {
    //   return;
    // }

    // this.message_sending = true;
    const message_obj = {
      text_message: message.value,
      sme_id: localStorage.getItem('uid'),
      sender_name: this.admin.name,
      sender_type: 'admin',
      attachment: [],
      created_at: new Date(),
    };

    this.onMessageSend.emit({ message: message_obj, index: this.index });

    // console.log(message_obj);

    // const data = {
    //   room_id: this.chat.student_id + this.chat.batch_id,
    //   chat_id: this.chat._id,
    // };
    message.value = '';
    // try {
    //   if (this.files.length > 0) {
    //     const files: any = await this.attachment_service.upload_files(
    //       this.files
    //     );
    //     message_obj['attachment'] = FormativeData.concat_url_with_files(
    //       files.files_paths
    //     );
    //   }
    //   // const index = this.chats.findIndex((ch) => ch.chat._id == chat._id);
    //   // if (index > -1) {
    //   //   this.chats[index].message.push(message_obj);
    //   // }

    //   this.student_message.push(message_obj);

    //   setTimeout(() => {
    //     this.scroll_chat_container();
    //   }, 50);
    //   this.live_session_chat_service.send_message(message_obj, data);

    //   this.files = [];
    //   this.message_sending = false;
    // } catch (error) {
    //   // console.log(error);
    // }
  }

  ngOnInit(): void {
    this.spinner = false;
    console.log(this.index);
  }

  ngAfterViewInit(): void {
    this.scroll_chat_container();
  }

  ngOnDestroy(): void {
    this.live_session_chat_service.remove_listen();
  }
}
