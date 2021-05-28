import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { PermissionService } from 'src/app/service/permission.service';
import { SubjectService } from 'src/app/service/subject.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  subject: any;
  create_course_form: FormGroup;
  spinner: boolean = false;

  constructor(
    private subject_service: SubjectService,
    private fb: FormBuilder,
    private course_service: CourseService,
    private router: Router,
    private permission_service: PermissionService,
    private activated_route: ActivatedRoute
  ) {}

  check_permission() {
    this.spinner = !this.spinner;
    this.activated_route.data.subscribe(async (res) => {
      try {
        const response = await this.permission_service.check_role(res.role);
        if (response) {
          this.spinner = !this.spinner;
          this.get_all_subject();
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

  get_all_subject() {
    this.spinner = true;
    // this.subject_service.get_all_subject().subscribe(
    //   (res) => {
    //     this.subject = FormativeData.format_firebase_get_request_data(res);
    //     this.spinner = false;
    //   },
    //   (err) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'SomeThing Went Wrong',
    //     }).then(() => {
    //       this.spinner = false;
    //     });
    //   }
    // );
  }

  validation() {
    this.create_course_form = this.fb.group({
      course_name: ['', Validators.required],
      subject_ids: ['', Validators.required],
    });
  }

  async get_course_data() {
    this.spinner = true;
    try {
      const data = this.create_course_form.getRawValue();
      data['disabled'] = false;
      const response = await this.course_service.create_course(data);
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Course Created',
      });
      this.create_course_form.reset();
      this.spinner = false;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'SomeThing Went Wrong',
      }).then(() => {
        this.spinner = false;
      });
    }
  }

  ngOnInit(): void {
    this.validation();
    this.check_permission();
  }
}
