import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  constructor() {}

  accordion_list(event) {
    const list = event.target.nextElementSibling;
    list.classList.toggle('d-none');
  }

  ngOnInit(): void {}
}
