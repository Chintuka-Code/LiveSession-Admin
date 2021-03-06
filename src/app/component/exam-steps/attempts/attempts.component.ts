import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../service/exam.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss'],
})
export class AttemptsComponent implements OnInit {
  spinner: boolean = false;

  access_setting = {};
  submitted: boolean = false;

  batchList = [];

  batchStudents = [];

  selectedCity1: any;
  student_fields = [];
  student_fields_list = [
    {
      label: 'Email address',
      name: 'email',
      placeholder: 'name@example.com',
      type: 'email',
      inactive: true,
    },
    { label: 'Name', name: 'name', placeholder: 'Your name', type: 'text' },
    {
      label: 'Phone',
      name: 'phone',
      placeholder: 'Phone Number',
      type: 'number',
    },
    {
      label: 'Father name',
      name: 'father_name',
      placeholder: 'Father name',
      type: 'text',
    },
    { label: 'State', name: 'state', placeholder: 'State name', type: 'text' },
    { label: 'City', name: 'city', placeholder: 'City name', type: 'text' },
    {
      label: 'Education',
      name: 'education',
      placeholder: 'Education',
      type: 'text',
    },
  ];

  access_control_opt = [
    { cname: 'Any one with link', code: 'Any one with link' },
    {
      name: 'Restrict with email',
      code: 'restrict with email',
      restrict_opt: [
        { cname: 'Align with batch', code: 'align with batch' },
        { cname: 'Manual enter email', code: 'manual enter email' },
      ],
    },
  ];

  constructor(
    // private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.access_setting = this.examService.examDetails.access_setting;
    this.student_fields = this.examService.examDetails.student_fields;
    if (!this.student_fields.length) {
      this.student_fields.push({
        label: 'Email address',
        name: 'email',
        placeholder: 'name@example.com',
        type: 'email',
        inactive: true,
      });
    }
    if (!this.examService.examDetails['_id']) {
      this.access_setting['max_attempt'] = 0;
    }

    if (this.access_setting['access_control'] == 'align with batch')
      this.get_batch();
    if (this.access_setting['batch'])
      this.get_students_by_batch(this.access_setting['batch']);
    if (this.access_setting['student']) {
      this.access_setting['menual_student'] =
        this.access_setting['student'].join('\n');
    }
  }

  // ngAfterViewInit() {

  // }
  accessControlChange(event) {
    this.access_setting['batch'] = [];
    this.access_setting['student'] = [];
    this.access_setting['menual_student'] = [];
    this.examService.examDetails.access_setting['batch'] = [];
    this.examService.examDetails.access_setting['student'] = [];
    this.examService.examDetails.access_setting['menual_student'] = [];

    if (event.value == 'align with batch') {
      this.get_batch();
    }

    // console.log('kjjk');
  }

  batchChange(event) {
    this.get_students_by_batch(event.value);
  }

  nextPage() {
    this.submitted = true;
    this.examService.examDetails.access_setting = this.access_setting;
    this.examService.examDetails.student_fields = this.student_fields;
    console.log(this.student_fields);
    // return;

    if (!this.student_fields.length) {
      return;
    }
    if (
      this.access_setting['max_attempt'] >= 0 &&
      this.access_setting['access_control']
    ) {
      if (this.access_setting['access_control'] != 'Any one with link') {
        if (this.access_setting['access_control'] == 'align with batch') {
          if (
            !this.access_setting['batch'] ||
            !this.access_setting['batch'].length ||
            !this.access_setting['student'] ||
            !this.access_setting['student'].length
          ) {
            return;
          }
        } else {
          if (
            !this.access_setting['menual_student'] ||
            !this.access_setting['menual_student'].length
          ) {
            return;
          }
        }
      }

      if (this.access_setting['access_control'] == 'manual enter email') {
        this.access_setting['student'] = this.access_setting['menual_student']
          .split('\n')
          .filter((item) => item != '');
      }

      // console.log(this.access_setting);
      this.router.navigate(['main/create-exam/settings']);
    }
  }

  prevPage() {
    this.router.navigate(['main/create-exam/instruction']);
  }

  get_batch() {
    this.spinner = true;
    this.examService.get_all_batch().subscribe(
      (res: any) => {
        this.batchList = res.batch;
        this.spinner = false;
        // console.log(this.batchList);
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

  get_students_by_batch(ids: []) {
    // console.log(ids);

    this.spinner = true;
    this.examService.get_students_by_batch(ids).subscribe(
      (res: any) => {
        // console.log(res);
        this.batchStudents = res.data;

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
}
