import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/service/permission.service';
import { StudentsService } from 'src/app/service/students.service';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
})
export class StudentsDetailsComponent implements OnInit {
  students_data: any;
  spinner: boolean = false;
  items: any[];
  user_profile: any;
  menu_type: string;
  student_type_disabled: boolean = false;
  constructor(
    private user_service: UserService,
    private permission_service: PermissionService,
    private router: Router,
    private student_service: StudentsService
  ) {}

  get_users_data() {
    this.spinner = true;
    this.student_service.get_student_details(false).subscribe(
      (res: any) => {
        this.students_data = res.data;
        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.router.navigate(['/main']);
        });
      }
    );
  }

  setMenu() {
    this.user_profile = ACTIVE_USER();
    if (!this.user_profile.permissions.includes('RS00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
      return;
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

    if (this.user_profile.permissions.includes('US01')) {
      this.items[0].items.push({
        label: 'Update Student',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'edit';
        },
      });
    }

    if (this.user_profile.permissions.includes('SPR11')) {
      this.items[0].items.push({
        label: 'Reset Password',
        icon: 'pi pi-user-edit',
        command: () => {
          this.menu_type = 'reset';
        },
      });
    }

    if (this.user_profile.permissions.includes('SBC11')) {
      this.items[0].items.push({
        label: 'Change Batch',
        icon: 'pi pi-replay',
        command: () => {
          this.menu_type = 'change-batch';
        },
      });
    }
  }

  set_dynamic_url(student) {
    switch (this.menu_type) {
      case 'view':
        this.router.navigate(['main/student-profile', student._id]);
        break;
      case 'edit':
        this.router.navigate(['main/update-student', student._id]);
        break;
      case 'reset':
        this.resetPassword(student);
        break;
      case 'change-batch':
        this.router.navigate(['main/change-batch', student._id]);
        break;
      default:
        console.log('');
    }
  }

  resetPassword(student) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Would you like to reset ${student.name} password`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, reset it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner = true;

        this.student_service.reset_password(student).subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Yeah...',
              text: 'Password Reset',
            }).then(() => {
              this.spinner = false;
            });
          },
          (error) => this.error_handler(error)
        );
      }
    });
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

  ngOnInit(): void {
    this.setMenu();
  }
}
