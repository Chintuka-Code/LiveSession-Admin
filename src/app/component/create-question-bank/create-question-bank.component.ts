import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-question-bank',
  templateUrl: './create-question-bank.component.html',
  styleUrls: ['./create-question-bank.component.scss'],
})
export class CreateQuestionBankComponent implements OnInit {
  spinner: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
