import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/service/permission.service';
import { StudentsService } from 'src/app/service/students.service';
import { UserService } from 'src/app/service/user.service';
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
  constructor(
    private user_service: UserService,
    private permission_service: PermissionService,
    private router: Router,
    private student_service: StudentsService
  ) {}

  get_users_data() {
    this.spinner = true;
    this.student_service.get_student_details().subscribe((res: any) => {
      this.students_data = FormativeData.format_firebase_get_request_data(res);
      this.spinner = false;
    });
  }

  async role() {
    this.user_service
      .get_user_by_id(localStorage.getItem('uid'))
      .subscribe((res: any) => {
        this.user_profile = res.data();

        this.setMenu();
      });
  }

  setMenu() {
    console.log(this.user_profile.permissions);
    if (!this.user_profile.permissions.includes('RS00')) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access Denied',
      });
      this.router.navigate(['/main']);
    }

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

    // if (this.user_profile.permissions.includes('S10')) {
    //   this.items[0].items.push({
    //     label: 'Edit',
    //     icon: 'pi pi-user-edit',
    //     command: () => {
    //       this.menu_type = 'edit';
    //     },
    //   });
    // }
  }

  set_dynamic_url(id) {
    if (this.menu_type === 'view') {
      this.router.navigate(['main/student-profile', id]);
    } else {
      this.router.navigate(['main/edit-user', id]);
    }
  }

  ngOnInit(): void {
    this.role();
    this.get_users_data();
  }
}
