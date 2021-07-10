import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BatchService } from 'src/app/service/batch.service';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.scss'],
})
export class ViewBatchComponent implements OnInit {
  spinner: boolean = false;
  user_profile: any;
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  batch: any[];
  disabled_batch_list: any[];
  dialog_visible: boolean = false;
  batch_details: any;
  batch_type_disabled: boolean = false;

  constructor(
    private user_service: UserService,
    private router: Router,
    private batch_service: BatchService
  ) {}

  setMenu() {
    this.spinner = true;
    this.user_profile = ACTIVE_USER();

    if (!this.user_profile.permissions.includes('B00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
      return;
    }

    this.get_batch(this.batch_type_disabled);

    this.items[0].items.push({
      label: 'View',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'view';
      },
    });

    this.items[0].items.push({
      label: 'View-Students',
      icon: 'pi pi-eye',
      command: () => {
        this.menu_type = 'students';
      },
    });

    if (this.user_profile.permissions.includes('B01')) {
      this.items[0].items.push({
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'edit';
        },
      });
    }

    if (this.user_profile.permissions.includes('AS10')) {
      this.items[0].items.push({
        label: 'Add Student',
        icon: 'pi pi-user-plus',
        command: () => {
          this.menu_type = 'add-student';
        },
      });
    }

    if (this.user_profile.permissions.includes('B11')) {
      this.items[0].items.push({
        label: 'Disabled',
        icon: 'pi pi-trash',
        command: () => {
          this.menu_type = 'disabled';
        },
      });
    }
  }

  get_updated_course() {
    this.batch_type_disabled = !this.batch_type_disabled;
    this.get_batch(this.batch_type_disabled);
  }

  get_batch(type) {
    this.spinner = true;
    this.batch_service.get_all_batch(type).subscribe(
      (res: any) => {
        this.batch = res.data;
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

  view_batch_details(batch) {
    this.spinner = true;

    this.batch_service.get_batch_details_by(batch._id).subscribe(
      (res: any) => {
        this.batch_details = res.data;

        this.batch_details.course = [
          {
            label: this.batch_details.course_id.course_name,
            children: this.batch_details.course_id.subject_ids.map(
              (subject) => {
                subject['type'] = 'sub';
                return subject;
              }
            ),
          },
        ];

        this.spinner = false;
        this.dialog_visible = true;
      },
      (error) => {
        // console.log(error);
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

  disabled_batch(batch) {
    this.spinner = true;
    this.update_batch_helper(batch, true);
  }

  enable_batch(batch) {
    this.spinner = true;
    this.update_batch_helper(batch, false);
  }

  batch_action(batch) {
    switch (this.menu_type) {
      case 'view':
        this.view_batch_details(batch);
        break;
      case 'edit':
        this.router.navigate(['/main/edit-batch', batch._id]);
        break;
      case 'students':
        this.router.navigate([
          '/main/batch-student',
          batch._id,
          batch.batch_name,
        ]);
        break;
      case 'disabled':
        this.disabled_batch(batch);
        break;
      case 'add-student':
        this.router.navigate([
          '/main/add-student-into-batch',
          batch._id,
          batch.batch_name,
        ]);
        break;
      default:
        console.log('');
    }
  }

  update_batch_helper(batch, type) {
    const string = type ? 'Disabled' : 'Enabled';
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${batch.batch_name} batch`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        batch['disabled'] = type;

        this.batch_service.change_batch_status(batch).subscribe(
          (res) => {
            Swal.fire(`${string}!`, `Batch has been ${string}`, 'success').then(
              () => {
                this.get_batch(this.batch_type_disabled);
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
