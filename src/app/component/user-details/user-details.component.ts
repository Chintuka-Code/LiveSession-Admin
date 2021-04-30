import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';

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
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private user_service: UserService
  ) {}

  get_users_data() {
    this.spinner = true;
    this.user_service.get_user_details().subscribe((res: any) => {
      this.user_data = FormativeData.format_firebase_get_request_data(res);
      this.spinner = false;
    });
  }

  ngOnInit(): void {
    this.user_type = this.ActivatedRoute.snapshot.params.user_type;
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
