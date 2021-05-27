import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  course_id: string;
  spinner: boolean = false;
  subject: any[];
  update_course_form: FormGroup;
  current_subject: any[] = [];
  course: any;
  constructor(
    private activated_route: ActivatedRoute,
    private subject_service: SubjectService,
    private fb: FormBuilder,
    private course_service: CourseService,
    private router: Router
  ) {}

  get_course_details() {
    this.spinner = true;
    this.course_service.get_course_details_by_id(this.course_id).subscribe(
      (res) => {
        this.course = res.data();

        this.get_all_subject();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get_all_subject() {
    this.spinner = true;
    this.subject_service.get_all_subject().subscribe(
      (res) => {
        this.subject = FormativeData.format_firebase_get_request_data(res);

        this.fill_pervious_details();
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

  fill_pervious_details() {
    this.spinner = true;

    this.update_course_form.controls.course_name.patchValue(
      this.course.course_name
    );
    this.update_course_form.controls.subject_ids.patchValue(
      this.subject.map((element) => {
        if (this.course.subject_ids.includes(element.doc_id)) {
          return element.doc_id;
        }
      })
    );
    this.spinner = false;
  }

  validation() {
    this.update_course_form = this.fb.group({
      course_name: ['', Validators.required],
      subject_ids: ['', Validators.required],
    });
  }

  async update_course_data() {
    try {
      this.spinner = true;
      const data = this.update_course_form.getRawValue();
      await this.course_service.update_course(data, this.course_id);
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Course Updated',
      }).then(() => {
        this.router.navigate(['/main/view-course']);
      });
      this.spinner = false;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Ooh...',
        text: 'Something Went wrong',
      });
      this.spinner = false;
    }
  }

  ngOnInit(): void {
    this.course_id = this.activated_route.snapshot.params.course_id;
    this.validation();
    this.get_course_details();
  }
}
