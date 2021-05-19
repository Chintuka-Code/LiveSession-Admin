import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BatchService } from 'src/app/service/batch.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  batch: any;
  spinner: boolean = false;
  user: any;
  constructor(
    private user_service: UserService,
    private batch_service: BatchService,
    private http: HttpClient
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

  ngOnInit(): void {
    this.get_user_all_batch();
  }
}
