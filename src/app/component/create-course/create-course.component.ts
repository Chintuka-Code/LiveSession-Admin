import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { PermissionService } from 'src/app/service/permission.service';
import { SubjectService } from 'src/app/service/subject.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
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
    this.activated_route.data.subscribe(
      (res) => {
        // console.log(res.role);
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
        this.get_all_subject();
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

  get_all_subject() {
    this.spinner = true;
    this.subject_service.get_subject(false).subscribe(
      (res: any) => {
        this.subject = res.data;
        this.spinner = false;
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'SomeThing Went Wrong',
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  validation() {
    this.create_course_form = this.fb.group({
      course_name: ['', Validators.required],
      subject_ids: ['', Validators.required],
    });
  }

  async get_course_data() {
    this.spinner = true;

    const data = this.create_course_form.getRawValue();
    data['disabled'] = false;
    this.course_service.create_course(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Course Created',
        });
        this.create_course_form.reset();
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
    // const response = await this.course_service.create_course(data);
  }

  ngOnInit(): void {
    this.validation();
    this.check_permission();
  }
}
