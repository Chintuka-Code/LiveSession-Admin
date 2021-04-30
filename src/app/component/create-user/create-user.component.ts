import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { PermissionService } from 'src/app/service/permission.service';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from '../../utilities/formative_data';
import Swal from 'sweetalert2';
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
  cols: { field: string; header: string }[];
  personal_info: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permission_service: PermissionService,
    private user_service: UserService,
    private messageService: MessageService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) {}

  check_permission() {
    this.spinner = !this.spinner;
    this.activated_route.data.subscribe(async (res) => {
      try {
        const response = await this.permission_service.check_role(res.role);
        if (response) {
          this.spinner = !this.spinner;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Access Denied',
          }).then(() => {
            this.router.navigate(['/main']);
            this.spinner = !this.spinner;
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  validation() {
    this.personal_info = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      user_type: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  initial_data() {
    this.cols = [{ field: 'name', header: 'Please Select Permission' }];
    this.user_type = ['Students', 'Admin', 'Trainer'];
  }

  get_permissions() {
    this.permission_service.get_all_permission().subscribe(
      (res: any) => {
        const data = FormativeData.format_firebase_get_request_data(res);
        this.permissions = FormativeData.format(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async get_personal_info() {
    this.spinner = !this.spinner;
    const user_info = this.personal_info.getRawValue();
    user_info['permissions'] = FormativeData.removeParent(
      this.selected_permission
    );
    user_info['disabled'] = false;
    try {
      const response = await this.user_service.user_authentication(user_info);
      const user_created = await this.user_service.create_user(
        user_info,
        response.user.uid
      );
      this.messageService.add({
        severity: 'success',
        summary: 'User Created',
      });
      this.personal_info.reset();
      this.permission = !this.permission;
      this.selected_permission = [];
      this.spinner = !this.spinner;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      }).then(() => {
        this.spinner = !this.spinner;
      });
    }
  }

  ngOnInit(): void {
    this.check_permission();
    this.validation();
    this.initial_data();
    this.get_permissions();
  }
}
