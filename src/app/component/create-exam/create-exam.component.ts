import { Component, OnInit } from '@angular/core';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
  spinner: boolean = false;
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'Form',
        routerLink: 'form'
      },
      {
          label: 'Instruction',
          routerLink: 'instruction'
      },
      {
          label: 'Attempts',
          routerLink: 'attempts'
      },
      {
          label: 'Browser settings',
          routerLink: 'settings'
      }
    ];

  }

}
