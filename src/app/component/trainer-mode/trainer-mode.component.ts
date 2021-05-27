import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { forkJoin, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { BatchService } from 'src/app/service/batch.service';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import { environment } from 'src/environments/environment';

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

  constructor(
    private http: HttpClient,
    private batch_service: BatchService,
    private chat_service: ChatService,
    private user_service: UserService
  ) {}

  // get all batch
  get_user_all_batch() {
    this.spinner = true;
    this.user_service
      .get_user_by_id(localStorage.getItem('uid'))
      .subscribe((res) => {
        this.user = res.data();

        const batch_request = this.user.batch_ids.map((batch) =>
          this.batch_service.get_batch_details_by(batch)
        );

        forkJoin(batch_request).subscribe((res) => {
          this.batch = res.map((batch: any) => batch.data());
          this.check_batch_timing(this.batch);
        });
      });
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
        current_date: new Date(date_obj.currentDateTime).getTime() / 1000,
      };

      batch.forEach((bat, index) => {
        const batch_info = {
          batch_start_date: bat.batch_start_date.seconds,

          batch_end_date: bat.batch_end_date.seconds,

          batch_start_time: FormativeData.formative_date(
            bat.batch_start_time.toDate(),
            'shortTime'
          ),
          batch_end_time: FormativeData.formative_date(
            bat.batch_end_time.toDate(),
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
      console.log(this.batch);
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
    this.selected_batch = selected_batch;
    let batch_chat: any = await this.chat_service
      .get_selected_batch_chat(selected_batch)
      .toPromise();
    batch_chat = FormativeData.format_firebase_get_request_data(batch_chat);

    await Promise.all(
      batch_chat.map(
        async (bat) =>
          new Promise((resolve, reject) => {
            this.chat_service
              .get_chat_message_trainer_mode(bat.doc_id)
              .subscribe((res: any) => {
                const chat = res.map((chat) => {
                  chat['chat_id'] = bat.doc_id;
                  return chat;
                });
                this.all_chats = [...this.all_chats, ...chat];
                this.all_chats.sort(
                  (a, b) => a.created_at.toDate() - b.created_at.toDate()
                );
                setTimeout(() => {
                  this.scroll_chat_container();
                }, 100);
                resolve('');
              });
          })
      )
    );

    this.spinner = false;
    this.scroll_chat_container();
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

  ngOnInit(): void {
    this.get_user_all_batch();
  }
}
