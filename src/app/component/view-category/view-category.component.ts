import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewCategoryComponent implements OnInit {
  spinner: boolean = false;
  category_type_disabled: boolean = false;
  user_profile: any;
  items: any = [{ label: 'Actions', items: [] }];
  menu_type: string;
  category: any[];

  constructor(
    private router: Router,
    private category_service: CategoryService
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

    this.get_category(this.category_type_disabled);

    if (this.user_profile.permissions.includes('CAT00')) {
      this.items[0].items.push({
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'edit';
        },
      });
    }

    if (this.user_profile.permissions.includes('CAT11')) {
      this.items[0].items.push({
        label: 'Disabled',
        icon: 'pi pi-trash',
        command: () => {
          this.menu_type = 'disabled';
        },
      });
    }
  }

  get_updated_category() {
    this.category_type_disabled = !this.category_type_disabled;
    this.get_category(this.category_type_disabled);
  }

  get_category(type) {
    this.spinner = true;
    this.category_service.get_all_category(type).subscribe((res: any) => {
      this.category = res.data;
      this.spinner = false;
    });
  }

  category_action(category) {
    switch (this.menu_type) {
      case 'edit':
        this.router.navigate(['/main/edit-category', category._id]);
        break;
      case 'disabled':
        this.change_category_status(category, true);
        break;

      default:
        console.log('');
    }
  }

  change_category_status(category, status) {
    const string = status ? 'Disabled' : 'Enabled';
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to ${string} ${category.category_name} batch`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${string} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        category['disabled'] = status;

        this.category_service.change_category_status(category).subscribe(
          (res) => {
            Swal.fire(`${string}!`, `Batch has been ${string}`, 'success').then(
              () => {
                this.get_category(this.category_type_disabled);
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
