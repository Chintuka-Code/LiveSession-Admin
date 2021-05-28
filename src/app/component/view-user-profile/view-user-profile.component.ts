import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.scss'],
})
export class ViewUserProfileComponent implements OnInit {
  user_id: string;
  spinner: boolean = false;
  user_info: unknown;

  constructor(
    private activated_route: ActivatedRoute,
    private user_service: UserService
  ) {}

  // get current user profile
  get_user_info() {
    this.spinner = true;
    this.user_service.get_user_by_id(this.user_id).subscribe((res: any) => {
      this.user_info = res.data;
      this.spinner = false;
    });
  }

  ngOnInit(): void {
    this.user_id = this.activated_route.snapshot.params.user_id;
    this.get_user_info();
  }
}
