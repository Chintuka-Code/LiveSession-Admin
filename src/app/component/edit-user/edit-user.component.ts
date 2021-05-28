import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { PermissionService } from 'src/app/service/permission.service';
import { FormativeData } from '../../utilities/formative_data';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';

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
  constructor(
    private fb: FormBuilder,
    private permission_service: PermissionService,
    private user_service: UserService,
    private activated_route: ActivatedRoute,
    private router: Router
  ) {}

  initial_data() {
    this.cols = [{ field: 'name', header: 'Please Select Permission' }];
    this.user_type = ['Admin', 'Trainer'];
  }

  // get current user profile
  get_user_info() {
    this.spinner = true;
    this.user_info = ACTIVE_USER();
    this.user_service.get_user_by_id(this.user_id).subscribe(
      (res: any) => {
        this.user_info = res.data;
        this.fill_previous_details();
        this.get_permissions();
      },
      (error) => {
        console.log(error);
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

  // Get all permission
  get_permissions() {
    this.permission_service.get_all_permission().subscribe(
      (res: any) => {
        this.permissions = FormativeData.format(res.permission);
        this.map_current_user_permission(res.permission);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  validation() {
    this.personal_info = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      user_type: ['', Validators.required],
    });
  }

  // Fill the form with current information of user
  fill_previous_details() {
    this.personal_info.controls.name.patchValue(this.user_info.name);
    this.personal_info.controls.email.patchValue(this.user_info.email);
    this.personal_info.controls.user_type.patchValue(this.user_info.user_type);
  }

  // map permission array
  map_current_user_permission(data) {
    console.log(data);
    data.forEach((element) => {
      if (this.user_info.permissions.includes(element.code)) {
        this.selected_permission.push({
          data: { name: element.permission_name, code: element.code },
        });
      }
    });
    this.spinner = false;
  }

  get_personal_info() {
    this.spinner = true;
    const data = this.personal_info.getRawValue();
    data['permissions'] = FormativeData.removeParent(this.selected_permission);

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
        Swal.fire({
          icon: 'error',
          title: 'ohh...',
          text: 'Something Went Wrong',
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['../main']);
        });
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
