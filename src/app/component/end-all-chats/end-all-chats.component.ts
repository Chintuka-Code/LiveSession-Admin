import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { ChatService } from 'src/app/service/chat.service';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-end-all-chats',
  templateUrl: './end-all-chats.component.html',
  styleUrls: ['./end-all-chats.component.scss'],
})
export class EndAllChatsComponent implements OnInit {
  user: any;
  spinner: boolean = false;
  batch_list: any;
  selected_batch: string;

  constructor(
    private batch_service: BatchService,
    private chat_service: ChatService,
    private router: Router,
    private live_session_chat_service: LiveSessionChatService
  ) {}

  get_user_info() {
    this.spinner = true;
    this.user = ACTIVE_USER();
    this.get_all_batch_list();
  }

  get_all_batch_list() {
    this.batch_service.get_all_batch_chat().subscribe((res: any) => {
      this.batch_list = res.data;
      this.spinner = false;
    });
  }

  end_all_chat() {
    this.spinner = true;
    this.chat_service.get_chat_batch_admin(this.selected_batch).subscribe(
      (res: any) => {
        res.data.forEach((chat) => {
          this.live_session_chat_service.leave({
            room_id: chat.student_id + this.selected_batch,
          });
        });

        this.live_session_chat_service.end_all_chat(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'All Chats have Ended',
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main']);
        });
      },
      (error) => this.error_handler(error)
    );
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

  ngOnInit(): void {
    this.get_user_info();
  }
}
