import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-question-bank',
  templateUrl: './view-question-bank.component.html',
  styleUrls: ['./view-question-bank.component.scss'],
})
export class ViewQuestionBankComponent implements OnInit {
  spinner: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
