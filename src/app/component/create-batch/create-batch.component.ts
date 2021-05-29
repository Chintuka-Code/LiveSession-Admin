import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { CourseService } from 'src/app/service/course.service';
import { PermissionService } from 'src/app/service/permission.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
})
export class CreateBatchComponent implements OnInit {
  spinner: boolean = false;
  create_batch_form: FormGroup;
  courses: any[] = [];
  days: string[];
  duration: string[];

  constructor(
    private fb: FormBuilder,
    private course_service: CourseService,
    private batch_service: BatchService,
    private permission_service: PermissionService,
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

  check_permission() {
    this.spinner = true;
    this.activated_route.data.subscribe(async (res) => {
      const user: any = ACTIVE_USER();

      if (!user.permissions.includes(res.role)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Access Denied',
        }).then(() => {
          this.router.navigate(['/main']);
          this.spinner = !this.spinner;
        });
        return;
      }
      this.get_all_course();
      this.spinner = false;
    });
  }

  validation() {
    this.create_batch_form = this.fb.group({
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

  get_all_course() {
    this.spinner = true;
    this.course_service.get_all_course(false).subscribe(
      (res: any) => {
        this.courses = res.data;
        this.courses.map((course) => delete course.disabled);
        console.log(this.courses);
        this.spinner = false;
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

  async create_batch() {
    const data = this.create_batch_form.getRawValue();
    data['disabled'] = false;
    this.spinner = true;

    this.batch_service.create_batch(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Batch Created',
        });
        this.create_batch_form.reset();
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
    this.check_permission();
    this.validation();
  }
}
