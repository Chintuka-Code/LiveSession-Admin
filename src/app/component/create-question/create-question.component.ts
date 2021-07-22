import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  spinner: boolean = false;
  question_bank_id: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.question_bank_id =
      this.route.snapshot.paramMap.get('question_bank_id');
  }
}
