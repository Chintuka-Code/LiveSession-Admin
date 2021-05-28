import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/service/students.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
import { Notification } from 'src/app/utilities/ACCESS_DENIED';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-subject',
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.scss'],
})
export class ViewSubjectComponent implements OnInit {
  spinner: boolean = false;
  user_profile: any;
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  subject: any;
  disabled_subject_list: any;
  subject_type_disabled: boolean = false;

  constructor(
    private subject_service: SubjectService,
    private user_service: UserService,
    private router: Router
  ) {}

  get_updated_subject() {
    this.subject_type_disabled = !this.subject_type_disabled;
    this.get_all_subject(this.subject_type_disabled);
  }

  get_all_subject(type) {
    this.spinner = true;
    this.subject_service.get_subject(type).subscribe(
      (res: any) => {
        this.subject = res.data;

        this.role();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.router.navigate(['/main']);
          this.spinner = false;
          return '';
        });
      }
    );
  }

  async role() {
    this.spinner = true;
    this.user_profile = ACTIVE_USER();
    this.setMenu();
  }

  setMenu() {
    this.items = [{ label: 'Actions', items: [] }];
    if (!this.user_profile.permissions.includes('SUB00')) {
      Notification.ACCESS_DENIED();
      this.router.navigate(['/main']);
      return;
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
      : this.disabled_subject(subject);
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
      this.subject_service.update_subject(subject).subscribe(
        (res) => {
          this.spinner = false;
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Something Went Wrong`,
            icon: 'error',
          }).then(() => {
            this.spinner = false;
          });
        }
      );
    }
  }

  disabled_subject(subject) {
    this.spinner = true;
    this.update_helper_code(subject, true);
  }

  enable_subject(subject) {
    this.spinner = true;
    this.update_helper_code(subject, false);
  }

  update_helper_code(subject, status) {
    const string = status ? 'Disabled' : 'Enabled';
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${subject.subject_name} subject`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        subject['disabled'] = status;

        this.subject_service.update_subject(subject).subscribe(
          (res) => {
            Swal.fire(
              `${string}!`,
              `Subject has been ${string}`,
              'success'
            ).then(() => {
              this.get_all_subject(this.subject_type_disabled);
            });
          },
          (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: `Something Went Wrong`,
              icon: 'error',
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
    this.get_all_subject(this.subject_type_disabled);
  }
}
