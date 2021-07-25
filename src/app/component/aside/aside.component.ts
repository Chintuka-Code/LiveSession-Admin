import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { HideAside } from 'src/app/store/actions/global.action';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  user: any;
  spinner: boolean = false;

  constructor(private store: Store) {}

  accordion_list(event) {
    const list = event.target.nextElementSibling;
    list.classList.toggle('d-none');
  }

  updateAside() {
    this.store.dispatch(new HideAside());
  }

  ngOnInit(): void {
    this.user = ACTIVE_USER();
  }
}
