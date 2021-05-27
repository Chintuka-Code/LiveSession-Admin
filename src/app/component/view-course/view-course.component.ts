import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, zip } from 'rxjs';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss'],
})
export class ViewCourseComponent implements OnInit {
  spinner: boolean;
  user_profile: any;
  items: any = [{ label: 'Actions', items: [] }];
  course: any;
  menu_type: string;
  dialog_visible: boolean = false;
  course_details: any;
  disabled_course_list: any;
  constructor(
    private user_service: UserService,
    private router: Router,
    private course_service: CourseService,
    private subject_service: SubjectService
  ) {}

  async role() {
    this.spinner = true;
    this.user_service
      .get_user_by_id(localStorage.getItem('uid'))
      .subscribe((res: any) => {
        this.user_profile = res.data();
        this.setMenu();
      });
  }

  setMenu() {
    if (!this.user_profile.permissions.includes('C00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
    } else {
      this.get_all_course();
      this.get_all_disabled_course();
      this.items[0].items.push({
        label: 'View',
        icon: 'pi pi-eye',
        command: () => {
          this.menu_type = 'view';
        },
      });

      if (this.user_profile.permissions.includes('C01')) {
        this.items[0].items.push({
          label: 'Edit',
          icon: 'pi pi-user-edit',
          command: () => {
            this.menu_type = 'edit';
          },
        });
      }

      if (this.user_profile.permissions.includes('C11')) {
        this.items[0].items.push({
          label: 'Disabled',
          icon: 'pi pi-trash',
          command: () => {
            this.menu_type = 'disabled';
          },
        });
      }
    }
  }

  get_all_course() {
    this.spinner = true;
    this.course_service.get_all_course().subscribe((res) => {
      this.course = FormativeData.format_firebase_get_request_data(res);
      this.spinner = false;
    });
  }

  get_all_disabled_course() {
    this.spinner = true;
    this.course_service.get_all_disabled_course().subscribe((res) => {
      this.disabled_course_list = FormativeData.format_firebase_get_request_data(
        res
      );
      this.spinner = false;
    });
  }

  view_course_details(course) {
    this.spinner = true;
    const request = course.subject_ids.map((res) =>
      this.subject_service.get_subject_by_id(res)
    );

    forkJoin(request).subscribe((response: any) => {
      course['subject'] = [];
      response.map((subject) => {
        course.subject.push(subject.data());
      });
      this.course_details = course;
      // console.log(this.course_details);
      this.spinner = false;
      this.dialog_visible = true;
    });
  }

  disabled_course(course) {
    this.spinner = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to disabled ${course.course_name} course`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disabled it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        course['disabled'] = true;
        const response = await this.course_service.disabled_course(course);
        Swal.fire('Disabled!', 'Course has been disabled', 'success').then(
          () => {
            this.get_all_course();
            this.get_all_disabled_course();
          }
        );
      } else {
        this.spinner = false;
      }
    });
  }

  enable_course(course) {
    this.spinner = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to enable ${course.course_name} course`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Enable it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        course['disabled'] = false;
        const response = await this.course_service.disabled_course(course);
        Swal.fire('Enabled!', 'Course has been enable', 'success').then(() => {
          this.get_all_course();
          this.get_all_disabled_course();
        });
      } else {
        this.spinner = false;
      }
    });
  }

  course_action(course) {
    switch (this.menu_type) {
      case 'view':
        this.view_course_details(course);
        break;
      case 'edit':
        this.router.navigate(['/main/edit-course', course.doc_id]);
        break;
      case 'disabled':
        this.disabled_course(course);
        break;
      default:
        console.log('');
    }
  }

  ngOnInit(): void {
    this.role();
  }
}
