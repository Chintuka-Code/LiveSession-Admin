import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentService } from 'src/app/service/attachment.service';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { TicketService } from 'src/app/service/ticket.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit {
  spinner: boolean = false;
  ticket_id: string;
  files: any[] = [];
  ticket_details: any;
  message_sending: boolean = false;
  @ViewChild('textarea') textarea: ElementRef;

  constructor(
    private activated_route: ActivatedRoute,
    private ticket_service: TicketService,
    private router: Router,
    private attachment_service: AttachmentService,
    private live_session_service: LiveSessionChatService
  ) {
    this.live_session_service.new_reply_ticket().subscribe((res) => {
      this.ticket_details.comment.message.push(res);
      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
    });
  }

  // // attachment
  attchment(event) {
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  textarea_auto_increment(event) {
    const tx = event.target;
    tx.style.height = 'auto';
    tx.style.height = tx.scrollHeight + 'px';
  }

  scroll_chat_container() {
    const div = document.getElementById('comment-list');
    if (div != null) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    } else {
      setTimeout(() => {
        this.scroll_chat_container();
      }, 200);
    }
  }

  get_ticket_details() {
    this.spinner = true;
    this.ticket_service.get_ticket_details(this.ticket_id).subscribe(
      (res: any) => {
        this.ticket_details = res.data;
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage || 'Some Went Wrong',
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  async send_message(textarea) {
    this.message_sending = true;
    const student: any = ACTIVE_USER();
    const data = {
      type: 'admin',
      message: textarea.value,
      sender_name: student.name,
      createdAt: Date.now(),
    };

    try {
      if (this.files.length > 0) {
        const files: any = await this.attachment_service.upload_files(
          this.files
        );
        data['attachment'] = FormativeData.concat_url_with_files(
          files.files_paths
        );
      }

      this.ticket_service.reply_ticket(data, this.ticket_id).subscribe(
        (res) => {
          this.live_session_service.ticket_reply(
            data,
            {
              room_id: this.ticket_id,
            },
            this.ticket_details.student
          );

          this.live_session_service.update_notification({
            user_id: localStorage.getItem('uid'),
            id: this.ticket_id,
          });

          this.textarea.nativeElement.value = '';
          this.files = [];
          this.message_sending = false;
        },
        (error) => this.error_handler(error)
      );
    } catch (error) {
      this.error_handler(error);
    }
  }

  ngOnInit(): void {
    this.ticket_id = this.activated_route.snapshot.params.ticket_id;
    this.live_session_service.join_room({ room_id: this.ticket_id });
    this.get_ticket_details();
    this.scroll_chat_container();
  }

  ngOnDestroy(): void {
    this.live_session_service.remove_listen();
  }
}
