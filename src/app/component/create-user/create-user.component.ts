import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { PermissionService } from 'src/app/service/permission.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from '../../utilities/formative_data';
import Swal from 'sweetalert2';
import { eye_button } from 'src/app/utilities/password_eye';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { Notification } from 'src/app/utilities/ACCESS_DENIED';
import { day } from 'src/app/utilities/days';
import { TicketService } from 'src/app/service/ticket.service';
import { CategoryService } from 'src/app/service/category.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [MessageService],
})
export class CreateUserComponent implements OnInit {
  permission: boolean = false;
  user_type: any[];
  selected_permission: TreeNode[] = [];
  permissions: TreeNode[];
  spinner: boolean = false;
  ticket: boolean = false;
  cols: { field: string; header: string }[];
  personal_info: FormGroup;
  days: string[] = day;

  ticket_permission: TreeNode[] = [];
  selected_category: any[] = [];
  selected_ticket_permission: TreeNode[] = [];
  category: any[] = [];

  @ViewChild('password') password: ElementRef;

  constructor(
    private fb: FormBuilder,
    private permission_service: PermissionService,
    private user_service: UserService,
    private messageService: MessageService,
    private activated_route: ActivatedRoute,
    private router: Router,
    private ticket_service: TicketService,
    private category_service: CategoryService
  ) {}

  check_permission() {
    this.spinner = !this.spinner;
    this.activated_route.data.subscribe(async (res) => {
      const user: any = ACTIVE_USER();
      if (!user.permissions.includes(res.role)) {
        this.router.navigate(['/main']);
        Notification.ACCESS_DENIED();
        return '';
      }
      this.spinner = false;
    });
  }

  validation() {
    this.personal_info = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      user_type: ['', Validators.required],
      password: ['', Validators.required],
      office_start_time: ['', Validators.required],
      office_end_time: ['', Validators.required],
      active_days: ['', Validators.required],
    });
  }

  initial_data() {
    // for permission table
    this.cols = [{ field: 'name', header: 'Please Select Permission' }];
    this.user_type = ['Admin', 'Trainer'];
  }

  get_permissions() {
    this.permission_service.get_all_permission().subscribe(
      (res: any) => {
        this.permissions = FormativeData.format(res.permission);
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
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  get_category() {
    this.spinner = true;
    this.category_service.get_category_type('Ticket').subscribe(
      (res: any) => {
        this.category = res.data;
        this.spinner = false;
      },
      (error) => {
        this.error_handler(error);
      }
    );
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

  show_password() {
    eye_button(this.password);
  }

  async get_personal_info() {
    this.spinner = !this.spinner;
    const user_info = this.personal_info.getRawValue();
    user_info['permissions'] = FormativeData.removeParent(
      this.selected_permission
    );
    user_info['disabled'] = false;
    user_info['batch_ids'] = [];
    user_info['ticket_permission'] = FormativeData.removeParent(
      this.selected_ticket_permission
    );
    user_info['ticket_handle_category'] = this.selected_category;
    this.user_service.create_user(user_info).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'User Created',
        });
        this.personal_info.reset();
        this.permission = false;
        this.ticket = false;
        this.selected_permission = [];
        this.spinner = !this.spinner;
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  ngOnInit(): void {
    this.check_permission();
    this.validation();
    this.initial_data();
    this.get_permissions();
    this.get_ticket_permission();
    this.get_category();
  }
}
