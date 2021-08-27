import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { AttachmentService } from 'src/app/service/attachment.service';
import { Detect_URL } from 'src/app/utilities/detect_url';

@Component({
  selector: 'app-trainer-mode',
  templateUrl: './trainer-mode.component.html',
  styleUrls: ['./trainer-mode.component.scss'],
})
export class TrainerModeComponent implements OnInit {
  spinner: boolean = false;
  batch: any[] = [];
  selected_batch: any;
  all_chats: any[] = [];
  user: any;
  student_id: any[] = [];
  files: any[] = [];
  message_sending: boolean = false;
  enable_student_name: boolean;
  @ViewChild('textarea') textarea: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private chat_service: ChatService,
    private user_service: UserService,
    private live_session_chat_service: LiveSessionChatService,
    private attachment_service: AttachmentService
  ) {
    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      console.log(res);
      if (res.message.sender_type !== 'admin') {
        if (this.all_chats) {
          const index = this.all_chats.findIndex(
            (ch) => ch.date == res.message.created_at.split('T')[0]
          );

          if (index > -1) {
            this.all_chats[index].message.push(res.message);
          } else {
            this.all_chats.push({
              date: res.message.created_at.split('T')[0],
              message: [res.message],
            });
          }
        }
      }
      this.message_sending = false;
      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
    });
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

  // get all batch
  get_user_all_batch() {
    this.spinner = true;
    this.user_service.get_admin_batch_details().subscribe(
      (res: any) => {
        const data = res.data;
        this.user = data;
        this.batch = data.batch_ids;
        if (this.batch.length > 0) {
          this.check_batch_timing(this.batch);
          return;
        }
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Batch Not found',
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main']);
        });
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  // check batch timing
  async check_batch_timing(batch) {
    try {
      const date_obj: any = await this.http
        .get(environment.time_api_url)
        .toPromise();

      const current_day_time = {
        current_time: new Date(
          `jan 0, ${new Date(date_obj.currentDateTime).toTimeString()}`
        ),
        current_day: date_obj.dayOfTheWeek,
        current_date: new Date(
          `${new Date(date_obj.currentDateTime).toDateString()},0:0:0`
        ),
      };

      batch.forEach((bat, index) => {
        const batch_info = {
          batch_start_date: new Date(bat.batch_start_date),
          batch_end_date: new Date(
            `${new Date(bat.batch_end_date).toDateString()},0:0:0`
          ),

          batch_start_time: new Date(
            `jan 0, ${new Date(bat.batch_start_time).toTimeString()}`
          ),

          batch_end_time: new Date(
            `jan 0,${new Date(bat.batch_end_time).toTimeString()}`
          ),
        };

        if (
          // current_day_time.current_time >= batch_info.batch_start_time &&
          // current_day_time.current_time <= batch_info.batch_end_time &&
          current_day_time.current_date >= batch_info.batch_start_date &&
          current_day_time.current_date <= batch_info.batch_end_date &&
          bat.active_days.includes(current_day_time.current_day)
        ) {
          bat.active = true;
        } else {
          bat.active = false;
        }
      });

      this.batch = batch;
      this.spinner = false;
    } catch (error) {
      this.spinner = false;
      this.error_handler(error);
    }
  }

  // get selected batch chat
  async get_selected_batch_all_chat(selected_batch) {
    this.all_chats = [];
    this.spinner = true;
    if (this.selected_batch) {
      this.leave_room();
    }
    this.selected_batch = selected_batch;
    this.chat_service
      .get_chat_message_trainer_mode(this.selected_batch._id)
      .subscribe(
        (res: any) => {
          this.all_chats = res.data;
          this.all_chats.sort((a, b) => a.created_at - b.created_at);
          this.group_by_date(this.all_chats);

          this.join_room();
          setTimeout(() => {
            this.scroll_chat_container();
          }, 50);
        },
        (error) => this.error_handler(error)
      );
  }

  scroll_chat_container() {
    const div = document.getElementById('chat-body');
    if (div != null) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    } else {
      setTimeout(() => {
        this.scroll_chat_container();
      }, 200);
    }
  }

  textarea_auto_increment(event) {
    const tx = event.target;
    tx.style.height = 'auto';
    tx.style.height = tx.scrollHeight + 'px';
  }

  // attachment
  attchment(event) {
    this.files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  join_room() {
    this.student_id = [];

    this.all_chats.forEach((message) => {
      message.message.forEach((element) => {
        if (
          !this.student_id.find((out) => out.student_id == element.student_id)
        ) {
          this.student_id.push({
            student_id: element.student_id,
            chat_id: element.chat_id,
            chat: { is_todays_first: new Date() },
          });
        }
      });
    });

    this.student_id.forEach((student) => {
      this.live_session_chat_service.join_room({
        room_id: student.student_id + this.selected_batch._id,
      });
    });
  }

  leave_room() {
    this.student_id.forEach((student) => {
      this.live_session_chat_service.leave({
        room_id: student + this.selected_batch._id,
      });
    });
  }

  student_name() {
    if (this.enable_student_name) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to enable this Feature`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, Enable it!`,
      }).then(async (result) => {
        // console.log(result);
        if (result.isConfirmed) {
          this.enable_student_name = true;
        } else {
          this.enable_student_name = false;
        }
      });
    }
  }

  // send message
  async send_message(message) {
    this.message_sending = true;

    const message_obj = {
      text_message: Detect_URL(message.value),
      sme_id: localStorage.getItem('uid'),
      sender_name: this.user.name,
      sender_type: 'super admin',
      attachment: [],
      created_at: new Date(),
    };

    this.textarea.nativeElement.value = '';
    try {
      if (this.files.length > 0) {
        const files: any = await this.attachment_service.upload_files(
          this.files
        );
        message_obj['attachment'] = FormativeData.concat_url_with_files(
          files.files_paths
        );
      }

      // this.all_chats.push(message_obj);
      this.scroll_chat_container();

      this.student_id.forEach((id) => {
        const data = {
          room_id: id.student_id + this.selected_batch._id,
          chat_id: id.chat_id,
          chat: id.chat,
        };

        this.live_session_chat_service.send_message(message_obj, data);
      });

      this.files = [];
    } catch (error) {
      this.error_handler(error);
    }
  }

  group_by_date(data) {
    const groups = data.reduce((groups, game) => {
      const date = game.created_at.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(game);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        message: groups[date],
      };
    });
    this.all_chats = groupArrays;
    this.spinner = false;
  }

  ngOnInit(): void {
    this.get_user_all_batch();
  }

  ngOnDestroy(): void {
    this.leave_room();
    this.live_session_chat_service.remove_listen();
  }
}
