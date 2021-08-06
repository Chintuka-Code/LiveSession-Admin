import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-from-existing-question',
  templateUrl: './add-from-existing-question.component.html',
  styleUrls: ['./add-from-existing-question.component.scss'],
})
export class AddFromExistingQuestionComponent implements OnInit {
  questionBank_name: String;
  questionBank_Id: String;
  constructor(private activated_route: ActivatedRoute) {}

  ngOnInit(): void {
    this.activated_route.queryParams.subscribe((params) => {
      this.questionBank_Id = params.question_bank_id;
      this.questionBank_name = params.question_bank_name;
    });
  }
}
