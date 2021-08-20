import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-create-question-from-csv',
  templateUrl: './create-question-from-csv.component.html',
  styleUrls: ['./create-question-from-csv.component.scss'],
})
export class CreateQuestionFromCsvComponent implements OnInit {
  questionBank_name: String;
  questionBank_Id: String;
  header: boolean = true;
  questions: any;
  constructor(
    private activated_route: ActivatedRoute,
    private ngxCsvParser: NgxCsvParser
  ) {}

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .subscribe(
        (result: Array<any>) => {
          this.questions = result;
          console.log(this.questions);
        },
        (error: NgxCSVParserError) => {
          // console.log('Error', error);
        }
      );
  }

  create_question() {
    console.log(this.questions);
  }

  ngOnInit(): void {
    this.activated_route.queryParams.subscribe((params) => {
      this.questionBank_Id = params.question_bank_id;
      this.questionBank_name = params.question_bank_name;
    });
  }
}
