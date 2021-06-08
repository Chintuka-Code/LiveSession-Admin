import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private chat_service: ChatService,
    private user_service: UserService,
    private live_session_chat_service: LiveSessionChatService
  ) {
    // new message
    this.live_session_chat_service.new_message_received().subscribe((res) => {
      if (res.sender_type === 'student') {
        this.all_chats.push(res);
      }

      setTimeout(() => {
        this.scroll_chat_container();
      }, 50);
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main']);
        });
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
        current_time: FormativeData.formative_date(
          date_obj.currentDateTime,
          'shortTime'
        ),
        current_day: date_obj.dayOfTheWeek,
        current_date: new Date(date_obj.currentDateTime),
      };

      batch.forEach((bat, index) => {
        const batch_info = {
          batch_start_date: new Date(bat.batch_start_date),

          batch_end_date: new Date(bat.batch_end_date),

          batch_start_time: FormativeData.formative_date(
            bat.batch_start_time,
            'shortTime'
          ),
          batch_end_time: FormativeData.formative_date(
            bat.batch_end_time,
            'shortTime'
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
      console.log(error);
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
    console.log(this.selected_batch._id);
    this.chat_service
      .get_chat_message_trainer_mode(this.selected_batch._id)
      .subscribe((res: any) => {
        this.all_chats = res.data;
        console.log(this.all_chats);
        this.all_chats.sort((a, b) => a.created_at - b.created_at);

        this.spinner = false;
        this.join_room();
        setTimeout(() => {
          this.scroll_chat_container();
        }, 50);
      });
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

  join_room() {
    this.student_id = [];

    this.all_chats.forEach((message) => {
      if (!this.student_id.find((out) => out == message.student_id)) {
        this.student_id.push(message.student_id);
      }
    });

    this.student_id.forEach((student) => {
      this.live_session_chat_service.join_room({
        room_id: student + this.selected_batch._id,
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

  ngOnInit(): void {
    this.get_user_all_batch();
  }

  ngOnDestroy(): void {
    this.leave_room();
    this.live_session_chat_service.disconnect();
  }
}
