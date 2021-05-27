import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/service/students.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss'],
})
export class ViewSubjectComponent implements OnInit {
  spinner: boolean;
  user_profile: any;
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  subject: any;
  disabled_subject: any;
  constructor(
    private subject_service: SubjectService,
    private user_service: UserService,
    private router: Router
  ) {}

  get_all_subject() {
    this.spinner = true;
    this.subject_service.get_all_subject().subscribe((res) => {
      this.subject = FormativeData.format_firebase_get_request_data(res);

      this.spinner = false;
    });
  }

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
    if (!this.user_profile.permissions.includes('SUB00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
    }

    if (this.user_profile.permissions.includes('SUB10')) {
      this.items[0].items.push({
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'edit';
        },
      });
    }

    if (this.user_profile.permissions.includes('SUB11')) {
      this.items[0].items.push({
        label: 'Disabled',
        icon: 'pi pi-trash',
        command: () => {
          this.menu_type = 'disabled';
        },
      });
    }

    this.spinner = false;
  }

  async update_subject(subject) {
    this.menu_type === 'edit'
      ? this.update_subject_name(subject)
      : this.disabled_course(subject);
  }

  async update_subject_name(subject) {
    const value = await Swal.fire({
      title: 'Update Subject Name',
      input: 'text',

      inputValue: subject.subject_name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      },
    });

    if (value.isConfirmed) {
      this.spinner = true;
      subject['subject_name'] = value.value;
      try {
        const response = await this.subject_service.update_subject(subject);
        console.log(response);
        this.spinner = false;
      } catch (error) {
        console.log(error);
        this.spinner = false;
      }
    }
  }

  disabled_course(subject) {
    this.spinner = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to disabled ${subject.subject_name} subject`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disabled it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        subject['disabled'] = true;
        const response = await this.subject_service.disabled_subject(subject);
        Swal.fire('Disabled!', 'Subject has been disabled', 'success').then(
          () => {
            this.get_all_subject();
            this.get_disabled_subject();
          }
        );
      } else {
        this.spinner = false;
      }
    });
  }

  get_disabled_subject() {
    this.spinner = true;
    this.subject_service.get_all_disabled_subject().subscribe((res) => {
      this.disabled_subject = FormativeData.format_firebase_get_request_data(
        res
      );

      this.spinner = false;
    });
  }

  enable_subject(subject) {
    this.spinner = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to enable ${subject.subject_name} subject`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Enable it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        subject['disabled'] = false;
        const response = await this.subject_service.disabled_subject(subject);
        Swal.fire('Enabled!', 'Subject has been enable', 'success').then(() => {
          this.get_all_subject();
          this.get_disabled_subject();
        });
      } else {
        this.spinner = false;
      }
    });
  }

  ngOnInit(): void {
    this.get_all_subject();
    this.get_disabled_subject();
    this.role();
  }
}
