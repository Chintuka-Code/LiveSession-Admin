import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { CourseService } from 'src/app/service/course.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.scss'],
})
export class EditBatchComponent implements OnInit {
  spinner: boolean = false;
  courses: any[];
  days: string[];
  duration: string[];
  update_batch_form: FormGroup;
  batch_id: string;

  constructor(
    private fb: FormBuilder,
    private course_service: CourseService,
    private batch_service: BatchService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) {
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    this.duration = [
      '1 Month',
      '2 Months',
      '3 Months',
      '4 Months',
      '5 Months',
      '6 Months',
      '7 Months',
      '8 Months',
      '9 Months',
      '10 Months',
      '11 Months',
      '12 Months',
    ];
  }

  get_all_course() {
    this.spinner = true;
    this.course_service.get_all_course(false).subscribe(
      (res: any) => {
        this.courses = res.data;
        this.courses.map((course) => delete course.disabled);
        this.spinner = false;
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

  validation() {
    this.update_batch_form = this.fb.group({
      batch_name: ['', Validators.required],
      course_id: ['', Validators.required],
      batch_duration: ['', Validators.required],
      batch_start_date: ['', Validators.required],
      batch_end_date: ['', Validators.required],
      active_days: ['', Validators.required],
      batch_start_time: ['', Validators.required],
      batch_end_time: ['', Validators.required],
    });
  }

  get_batch_information() {
    this.spinner = true;
    this.batch_service.get_edit_batch_details_by_id(this.batch_id).subscribe(
      (res: any) => {
        const batch_details = res.data;
        this.fill_pervious_details(batch_details);
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

  fill_pervious_details(batch) {
    this.spinner = true;
    console.log();
    this.update_batch_form.controls.batch_name.patchValue(batch.batch_name);
    this.update_batch_form.controls.batch_duration.patchValue(
      batch.batch_duration
    );
    this.update_batch_form.controls.batch_start_date.patchValue(
      new Date(batch.batch_start_date)
    );
    this.update_batch_form.controls.batch_end_date.patchValue(
      new Date(batch.batch_end_date)
    );
    this.update_batch_form.controls.active_days.patchValue(batch.active_days);
    this.update_batch_form.controls.batch_start_time.patchValue(
      new Date(batch.batch_start_time)
    );
    this.update_batch_form.controls.batch_end_time.patchValue(
      new Date(batch.batch_end_time)
    );
    this.update_batch_form.controls.course_id.patchValue(batch.course_id._id);

    this.spinner = false;
  }

  async update_batch() {
    this.spinner = true;

    const data = this.update_batch_form.getRawValue();
    data['_id'] = this.batch_id;
    this.batch_service.change_batch_status(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Course Updated',
        }).then(() => {
          this.router.navigate(['/main/view-batch']);
        });
        this.spinner = false;
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

  ngOnInit(): void {
    this.batch_id = this.activated_route.snapshot.params.batch_id;
    console.log(this.batch_id);
    this.validation();
    this.get_batch_information();
    this.get_all_course();
  }
}
