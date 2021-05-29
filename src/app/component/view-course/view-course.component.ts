import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, zip } from 'rxjs';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
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
  course_type_disabled: boolean = false;

  constructor(
    private user_service: UserService,
    private router: Router,
    private course_service: CourseService,
    private subject_service: SubjectService
  ) {}

  setMenu() {
    this.spinner = true;
    this.user_profile = ACTIVE_USER();

    if (!this.user_profile.permissions.includes('C00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
      return;
    }

    this.get_all_course(this.course_type_disabled);

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

  course_action(course) {
    switch (this.menu_type) {
      case 'view':
        this.view_course_details(course);
        break;
      case 'edit':
        this.router.navigate(['/main/edit-course', course._id]);
        break;
      case 'disabled':
        this.disabled_course(course);
        break;
      default:
        console.log('');
    }
  }

  get_updated_course() {
    this.course_type_disabled = !this.course_type_disabled;
    this.get_all_course(this.course_type_disabled);
  }

  get_all_course(type) {
    this.spinner = true;
    this.course_service.get_all_course(type).subscribe(
      (res: any) => {
        console.log(res.data);
        this.course = res.data;
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

  view_course_details(course) {
    this.spinner = true;

    this.course_service.view_details_by_id(course._id).subscribe(
      (res: any) => {
        this.course_details = res.data;
        console.log(this.course_details);
        this.spinner = false;
        this.dialog_visible = true;
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

  disabled_course(course) {
    this.spinner = true;
    this.update_course_helper(course, true);
  }

  enable_course(course) {
    this.spinner = true;
    this.update_course_helper(course, false);
  }

  update_course_helper(course, type) {
    const string = type ? 'Disabled' : 'Enabled';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${course.course_name} course`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        course['disabled'] = type;
        console.log(course);
        this.course_service.change_status(course).subscribe(
          (res) => {
            Swal.fire('Disabled!', `Course has been ${string}`, 'success').then(
              () => {
                this.get_all_course(this.course_type_disabled);
              }
            );
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
        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
    this.setMenu();
  }
}
