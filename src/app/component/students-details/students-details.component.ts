import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss'],
})
export class StudentsDetailsComponent implements OnInit {
  students_data: any;
  spinner: boolean = false;
  items: any[];
  constructor(private user_service: UserService) {}

  get_users_data() {
    this.spinner = true;
    this.user_service.get_students_details().subscribe((res: any) => {
      this.students_data = FormativeData.format_firebase_get_request_data(res);
      this.spinner = false;
    });
  }

  ngOnInit(): void {
    this.get_users_data();
    this.items = [
      {
        label: 'Actions',
        items: [
          {
            label: 'View',
            icon: 'pi pi-eye',
            routerLink: '../../view-user-profile',
          },
          {
            label: 'Edit',
            icon: 'pi pi-user-edit',
            routerLink: '../../edit-user',
          },
        ],
      },
    ];
  }
}
