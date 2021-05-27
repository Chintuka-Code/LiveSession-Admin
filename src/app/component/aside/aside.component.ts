import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormativeData } from 'src/app/utilities/formative_data';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  user: any;
  spinner: boolean = false;

  constructor(private user_service: UserService) {}

  accordion_list(event) {
    const list = event.target.nextElementSibling;
    list.classList.toggle('d-none');
  }

  get_user() {
    this.spinner = true;
    this.user_service
      .get_user_by_id(localStorage.getItem('uid'))
      .subscribe((res) => {
        this.user = res.data();
        this.spinner = false;
      });
  }

  ngOnInit(): void {
    this.get_user();
  }
}
