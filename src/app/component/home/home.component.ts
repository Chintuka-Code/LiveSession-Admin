import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { BatchService } from 'src/app/service/batch.service';
import { StudentsService } from 'src/app/service/students.service';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  batch: any;
  spinner: boolean = false;
  user: any;
  total_student: number = 0;

  constructor(
    private student_service: StudentsService,
    private batch_service: BatchService,
    private http: HttpClient
  ) {}

  // get all batch
  get_user_all_batch() {
    this.spinner = true;
    this.user = ACTIVE_USER();

    if (this.user.batch_ids.length > 0) {
      this.batch_service.get_batch_details_home().subscribe(
        (res: any) => {
          this.check_batch_timing(res.data);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.errorMessage,
          }).then(() => {
            this.spinner = false;
          });
        }
      );
      return;
    }
    this.total_student_count();
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

      console.log(batch);

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
      this.total_student_count();
      this.batch = batch;
      console.log(this.batch);
    } catch (error) {
      this.spinner = false;
      // console.log(error);
    }
  }

  total_student_count() {
    this.student_service.total_student().subscribe((res: any) => {
      this.total_student = res.count;
      this.spinner = false;
    });
  }

  ngOnInit(): void {
    this.get_user_all_batch();
  }
}
