import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { Observable } from 'rxjs';
import { PermissionService } from 'src/app/service/permission.service';
import { StudentsService } from 'src/app/service/students.service';
import Swal from 'sweetalert2';

import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
@Component({
  selector: 'app-create-students',
  templateUrl: './create-students.component.html',
  styleUrls: ['./create-students.component.scss'],
})
export class CreateStudentsComponent implements OnInit {
  bulk: boolean = false;
  student_record: any[];
  header: boolean = true;
  spinner: boolean = false;
  student_create_form: FormGroup;
  ref: Observable<any>;
  subscription;
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private student_service: StudentsService,
    private fb: FormBuilder,
    private activated_route: ActivatedRoute,
    private permission_service: PermissionService,
    private router: Router
  ) {}

  check_permission() {
    this.spinner = !this.spinner;
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

      this.spinner = !this.spinner;
    });
  }

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .subscribe(
        (result: Array<any>) => {
          this.student_record = result;
        },
        (error: NgxCSVParserError) => {
          console.log('Error', error);
        }
      );
  }

  // for bulk upload
  async create_student() {
    this.spinner = true;
    this.student_service
      .bulk_student_registration(this.student_record)
      .subscribe(
        (res) => {
          this.spinner = false;
          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Course Created',
          });
          this.bulk = false;
          this.student_record = [];
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.errorMessage,
          }).then(() => {
            this.router.navigate(['/main']);
          });
        }
      );
  }

  validation() {
    this.student_create_form = this.fb.group({
      // name: ['', Validators.required],
      email: ['', Validators.required],
      date_of_joining: ['', Validators.required],
    });
  }

  async create_student_single() {
    this.spinner = true;
    const data = this.student_create_form.getRawValue();
    data['password'] = 'datatrained';
    data['disabled'] = false;
    data['permission'] = ['S00'];
    data['batch_ids'] = [];
    data['first_time'] = true;
    data['name'] = null;

    this.student_service.create_single_student(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Student Account Created',
        });
        this.student_create_form.reset();
        this.bulk = false;
        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.router.navigate(['/main']);
        });
      }
    );
  }

  ngOnInit(): void {
    this.check_permission();
    this.validation();
  }
}
