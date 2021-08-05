import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.scss'],
})
export class ManagerViewComponent implements OnInit {
  spinner: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
