import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../service/exam.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  batch_start_date;
  publish: {};
  spinner: boolean = false;
  is_exam_id: boolean = false;
  sloat_end_time: Date;
  minDateValue: Date = new Date();
  addedTime: Date = new Date();

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.publish = this.examService.examDetails.publish;
    if (this.examService.examDetails['_id']) {
      this.is_exam_id = true;
    }
  }

  prevPage() {
    this.router.navigate(['main/create-exam/exam_question']);
  }

  examPublish() {
    console.log(this.examService.examDetails);

    const formData = Object.assign({}, this.examService.examDetails);
    delete formData.selected_question;

    if (formData.access_setting['access_control'] == 'manual enter email') {
      delete formData.access_setting['menual_student'];
    }

    this.spinner = true;
    console.log(formData);

    if (this.is_exam_id) {
      delete formData['createdAt'];
      delete formData['updatedAt'];
      delete formData['__v'];
      console.log(formData);

      this.examService.update_exam(formData['_id'], formData).subscribe(
        (res: any) => {
          console.log(res);

          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Exam updated successfully',
          }).then(() => this.router.navigate(['main/view-exam']));
          this.spinner = false;

          // this.spinner = false;
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
    } else {
      this.examService.create_exam(formData).subscribe(
        (res: any) => {
          console.log(res);

          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Exam created successfully',
          }).then(() => this.router.navigate(['main/view-exam']));
          this.spinner = false;

          // this.spinner = false;
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
    }
  }

  onStartTimeSelect(value: Date) {
    if (this.examService.examDetails.exam_form['exam_duration']) {
      let duration = this.examService.examDetails.exam_form['exam_duration'];
      this.addedTime = this.addMinutes(value, duration);
      this.publish['slot_end_time'] = this.addedTime;
    }
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
}
