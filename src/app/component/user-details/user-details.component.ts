import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Notification } from 'src/app/utilities/ACCESS_DENIED';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user_type: string;
  user_data: any;
  spinner: boolean = false;
  items: any[];
  user_profile: any;
  menu_type: string;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private user_service: UserService,
    private router: Router
  ) {}

  get_users_data() {
    this.spinner = true;
    this.user_service.get_user_details().subscribe(
      (res: any) => {
        this.user_data = res.data;
        this.spinner = false;
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
    if (!this.user_profile.permissions.includes('U00')) {
      this.router.navigate(['/main']);
      Notification.ACCESS_DENIED();
      return '';
    }
    this.get_users_data();
    this.items = [
      {
        label: 'Actions',
        items: [
          {
            label: 'View',
            icon: 'pi pi-eye',
            command: () => {
              this.menu_type = 'view';
            },
          },
        ],
      },
    ];

    if (this.user_profile.permissions.includes('U10')) {
      this.items[0].items.push({
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'edit';
        },
      });
    }

    if (this.user_profile.permissions.includes('LOG11')) {
      this.items[0].items.push({
        label: 'View Log',
        icon: 'pi pi-eye',
        command: () => {
          this.menu_type = 'view-log';
        },
      });
    }

    if (this.user_profile.permissions.includes('LSS11')) {
      this.items[0].items.push({
        label: 'Live Session Setting',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'live_session';
        },
      });
    }
  }

  set_dynamic_url(id) {
    switch (this.menu_type) {
      case 'view':
        this.router.navigate(['main/view-user-profile', id]);
        break;

      case 'edit':
        this.router.navigate(['main/edit-user', id]);
        break;

      case 'live_session':
        this.router.navigate(['main/assign-batch-to-admin', id]);
        break;

      case 'view-log':
        this.router.navigate(['main/view-log'], {
          queryParams: { user_id: id },
        });
        break;

      default:
      // console.log('');
    }
  }

  ngOnInit(): void {
    this.role();
  }
}
