import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { PermissionService } from 'src/app/service/permission.service';
import { FormativeData } from '../../utilities/formative_data';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { Notification } from 'src/app/utilities/ACCESS_DENIED';
import { day } from 'src/app/utilities/days';
import { CategoryService } from 'src/app/service/category.service';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  permission: boolean = false;
  user_type: any[];
  selected_permission: TreeNode[] = [];
  permissions: TreeNode[];
  spinner: boolean = false;
  cols: { field: string; header: string }[];
  personal_info: FormGroup;
  user_info: any;
  user_id: string;
  ticket: boolean = false;
  days: string[] = day;
  category: any[] = [];
  ticket_permission: TreeNode[] = [];
  selected_category: any[] = [];
  selected_ticket_permission: TreeNode[] = [];

  constructor(
    private fb: FormBuilder,
    private permission_service: PermissionService,
    private user_service: UserService,
    private activated_route: ActivatedRoute,
    private router: Router,
    private category_service: CategoryService,
    private ticket_service: TicketService
  ) {}

  initial_data() {
    this.cols = [{ field: 'name', header: 'Please Select Permission' }];
    this.user_type = ['Admin', 'Trainer'];
  }

  // get current user profile
  get_user_info() {
    this.spinner = true;
    this.user_info = ACTIVE_USER();

    if (!this.user_info.permissions.includes('U10')) {
      this.router.navigate(['/main']);
      Notification.ACCESS_DENIED();
      return '';
    }
    this.user_service.get_user_by_id(this.user_id).subscribe(
      (res: any) => {
        this.user_info = res.data;
        this.fill_previous_details();
        this.get_permissions();
        this.get_ticket_permission();
        this.get_category();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = !this.spinner;
        });
      }
    );
  }

  get_category() {
    this.category_service.get_category_type('Ticket').subscribe(
      (res: any) => {
        this.category = res.data;

        this.category.map((cat) => {
          this.user_info.ticket_handle_category.some((id) => id === cat._id)
            ? this.selected_category.push(cat._id)
            : '';
        });
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  // Get all permission
  get_permissions() {
    this.permission_service.get_all_permission().subscribe(
      (res: any) => {
        this.permissions = FormativeData.format(res.permission);
        this.map_current_user_permission(res.permission);
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  get_ticket_permission() {
    this.spinner = true;
    this.ticket_service.get_ticket_permission().subscribe(
      (res: any) => {
        this.ticket_permission = FormativeData.format(res.permission);
        this.map_current_user_ticket_permission(res.permission);
      },
      (error) => this.error_handler(error)
    );
  }

  validation() {
    this.personal_info = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      user_type: ['', Validators.required],
      office_start_time: ['', Validators.required],
      office_end_time: ['', Validators.required],
      active_days: ['', Validators.required],
    });
  }

  // Fill the form with current information of user
  fill_previous_details() {
    this.personal_info.controls.name.patchValue(this.user_info.name);
    this.personal_info.controls.email.patchValue(this.user_info.email);
    this.personal_info.controls.user_type.patchValue(this.user_info.user_type);
    this.personal_info.controls.office_start_time.patchValue(
      new Date(this.user_info.office_start_time)
    );
    this.personal_info.controls.office_end_time.patchValue(
      new Date(this.user_info.office_end_time)
    );
    this.personal_info.controls.active_days.patchValue(
      this.user_info.active_days
    );
  }

  // map permission array
  map_current_user_permission(data) {
    data.forEach((element) => {
      if (this.user_info.permissions.includes(element.code)) {
        this.selected_permission.push({
          data: { name: element.permission_name, code: element.code },
        });
      }
    });
    this.spinner = false;
  }

  // map permission array
  map_current_user_ticket_permission(data) {
    data.forEach((element) => {
      if (this.user_info.ticket_permission.includes(element.code)) {
        this.selected_ticket_permission.push({
          data: { name: element.permission_name, code: element.code },
        });
      }
    });
    this.spinner = false;
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  get_personal_info() {
    this.spinner = true;
    const data = this.personal_info.getRawValue();
    data['permissions'] = FormativeData.removeParent(this.selected_permission);
    data['ticket_permission'] = FormativeData.removeParent(
      this.selected_ticket_permission
    );
    data['ticket_handle_category'] = this.selected_category;

    this.user_service.update_user_by_id(data, this.user_id).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'User Information Updated',
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['../main']);
        });
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  ngOnInit(): void {
    this.user_id = this.activated_route.snapshot.params.user_id;
    this.validation();
    this.initial_data();
    this.get_user_info();
  }
}
