import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BatchService } from 'src/app/service/batch.service';
import { CourseService } from 'src/app/service/course.service';
import { SubjectService } from 'src/app/service/subject.service';
import { UserService } from 'src/app/service/user.service';
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
  enable_batch: any[];
  disabled_batch_list: any[];
  dialog_visible: boolean = false;
  batch_details: any;

  constructor(
    private user_service: UserService,
    private router: Router,
    private batch_service: BatchService,
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
    if (!this.user_profile.permissions.includes('B00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
    } else {
      this.get_disabled_batch();
      this.get_enable_batch();
      this.items[0].items.push({
        label: 'View',
        icon: 'pi pi-eye',
        command: () => {
          this.menu_type = 'view';
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
  }

  get_enable_batch() {
    this.spinner = true;
    this.batch_service.get_all_enable_batch().subscribe((res) => {
      this.enable_batch = FormativeData.format_firebase_get_request_data(res);
      this.spinner = false;
    });
  }

  get_disabled_batch() {
    this.spinner = true;
    this.batch_service.get_all_disabled_batch().subscribe((res) => {
      this.disabled_batch_list = FormativeData.format_firebase_get_request_data(
        res
      );
      this.spinner = false;
    });
  }

  async view_batch_details(batch) {
    this.spinner = true;
    let course_response = await this.course_service
      .get_course_details_by_id(batch.course_id)
      .toPromise();
    const course_details: any = course_response.data();

    const request = course_details.subject_ids.map((res) =>
      this.subject_service.get_subject_by_id(res)
    );

    forkJoin(request).subscribe((response: any) => {
      course_details['subject'] = [
        {
          label: course_details.course_name,
          children: response.map((subject) => {
            const sub = subject.data();
            sub['type'] = 'sub';
            return sub;
          }),
        },
      ];
      batch['course'] = course_details;
      this.batch_details = batch;

      this.spinner = false;
      this.dialog_visible = true;
    });
  }

  disabled_batch(batch) {
    this.spinner = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to disabled ${batch.batch_name} batch`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, disabled it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        batch['disabled'] = true;
        const response = await this.batch_service.disabled_batch(
          batch.doc_id,
          true
        );
        Swal.fire('Disabled!', 'Batch has been disabled', 'success').then(
          () => {
            this.get_enable_batch();
            this.get_disabled_batch();
          }
        );
      } else {
        this.spinner = false;
      }
    });
  }

  enable(batch) {
    this.spinner = true;
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to enable ${batch.batch_name} batch`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, enable it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await this.batch_service.disabled_batch(
          batch.doc_id,
          false
        );
        Swal.fire('Enabled!', 'Batch has been enabled', 'success').then(() => {
          this.get_enable_batch();
          this.get_disabled_batch();
        });
      } else {
        this.spinner = false;
      }
    });
  }

  batch_action(batch) {
    switch (this.menu_type) {
      case 'view':
        this.view_batch_details(batch);
        break;
      case 'edit':
        this.router.navigate(['/main/edit-batch', batch.doc_id]);
        break;
      case 'disabled':
        this.disabled_batch(batch);
        break;
      case 'add-student':
        this.router.navigate(['/main/add-student-into-batch', batch.doc_id]);
        break;
      default:
        console.log('');
    }
  }

  ngOnInit(): void {
    this.role();
  }
}
