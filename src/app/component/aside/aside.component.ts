import { Component, OnInit } from '@angular/core';
import { LiveSessionChatService } from 'src/app/service/live-session-chat.service';
import { UserService } from 'src/app/service/user.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  user: any;
  spinner: boolean = false;

  constructor() {}

  accordion_list(event) {
    const list = event.target.nextElementSibling;
    list.classList.toggle('d-none');
  }

  ngOnInit(): void {
    this.user = ACTIVE_USER();
  }
}
