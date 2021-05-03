import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { PermissionService } from 'src/app/service/permission.service';
import { StudentsService } from 'src/app/service/students.service';
import Swal from 'sweetalert2';
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
      try {
        const response = await this.permission_service.check_role(res.role);
        console.log(res.role);
        if (response) {
          this.spinner = !this.spinner;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Access Denied',
          }).then(() => {
            this.router.navigate(['/main']);
            this.spinner = !this.spinner;
          });
        }
      } catch (error) {
        console.log(error);
      }
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
    const user = [];
    await Promise.all(
      this.student_record.map(async (student) => {
        const data = {
          email: student.email.toLowerCase(),
          name: student.name,
          password: 'datatrained',
          disabled: false,
          permission: ['S00'],
        };

        try {
          // to check row is empty or not
          if (data.email) {
            const response = await this.student_service.user_authentication(
              data
            );

            user.push({ data, uid: response.user.uid });
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: error.message,
            footer: data.email,
          }).then(() => {
            this.spinner = false;
            this.bulk = false;
          });
        }
      })
    );

    await Promise.all(
      user.map(async (record) => {
        await await this.student_service.create_student(
          record.data,
          record.uid
        );
      })
    );

    console.log(user);
    Swal.fire({
      icon: 'success',
      title: 'Yeah...',
      text: 'Student Account Created',
    });
    this.bulk = false;
    this.spinner = false;
  }

  validation() {
    this.student_create_form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  async create_student_single() {
    this.spinner = true;
    const data = this.student_create_form.getRawValue();
    data['password'] = 'datatrained';
    data['disabled'] = false;
    data['permission'] = ['S00'];
    try {
      const response = await this.student_service.user_authentication(data);
      const create_user = await this.student_service.create_student(
        data,
        response.user.uid
      );
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Student Account Created',
      });
      this.student_create_form.reset();
      this.bulk = false;
      this.spinner = false;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: error.message,
        footer: data.email,
      }).then(() => (this.spinner = false));
    }
  }

  ngOnInit(): void {
    this.check_permission();
    this.validation();
  }
}
