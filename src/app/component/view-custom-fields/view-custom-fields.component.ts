import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomFieldsService } from 'src/app/service/custom-fields.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-custom-fields',
  templateUrl: './view-custom-fields.component.html',
  styleUrls: ['./view-custom-fields.component.scss'],
})
export class ViewCustomFieldsComponent implements OnInit {
  spinner: boolean = false;
  custom_fields: any;
  items: any = [{ label: 'Actions', items: [] }];
  user_profile: any;
  menu_type: string;
  disbaled_fields: boolean = false;
  constructor(
    private custom_fields_service: CustomFieldsService,
    private router: Router
  ) {}

  setMenu() {
    this.user_profile = ACTIVE_USER();
    this.get_custom_fields(false);
    // this.items[0].items.push({
    //   label: 'Edit',
    //   icon: 'pi pi-user-edit',
    //   command: () => {
    //     this.menu_type = 'edit';
    //   },
    // });
    this.items[0].items.push({
      label: 'Disabled',
      icon: 'pi pi-trash',
      command: () => {
        this.menu_type = 'disabled';
      },
    });
  }

  update_data() {
    this.disbaled_fields = !this.disbaled_fields;
    this.get_custom_fields(this.disbaled_fields);
  }

  get_custom_fields(type) {
    this.spinner = true;
    this.custom_fields_service.get_custom_fields(type).subscribe(
      (res: any) => {
        this.custom_fields = res.data;
        console.log(this.custom_fields);
        this.spinner = false;
      },
      (error) => this.error_handler(error)
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

  update_custom_fields(fields) {
    switch (this.menu_type) {
      case 'edit':
        this.router.navigate(['/main/edit-course', fields._id]);
        break;
      case 'disabled':
        this.disabled_(fields);
        break;
      default:
        console.log('');
    }
  }

  disabled_(fields) {
    this.spinner = true;
    this.update_fields_helper(fields, true);
  }

  enable_fields(fields) {
    this.spinner = true;
    this.update_fields_helper(fields, false);
  }

  update_fields_helper(fields, type) {
    const string = type ? 'Disabled' : 'Enabled';

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${fields.name} fields`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        fields['disabled'] = type;
        console.log(fields);
        this.spinner = false;

        this.custom_fields_service.update_status(fields).subscribe(
          (res) => {
            console.log(res);
            this.get_custom_fields(this.disbaled_fields);
            this.spinner = false;
          },
          (error) => this.error_handler(error)
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
