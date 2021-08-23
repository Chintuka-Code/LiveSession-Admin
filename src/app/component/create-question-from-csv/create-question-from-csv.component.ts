import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { QuestionService } from 'src/app/service/question.service';
import { Filter_Code } from 'src/app/utilities/filter_data';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-question-from-csv',
  templateUrl: './create-question-from-csv.component.html',
  styleUrls: ['./create-question-from-csv.component.scss'],
})
export class CreateQuestionFromCsvComponent implements OnInit {
  questionBank_name: String;
  questionBank_Id: String;
  header: boolean = true;
  questions: any[] = [];
  spinner: boolean = false;

  constructor(
    private activated_route: ActivatedRoute,
    private ngxCsvParser: NgxCsvParser,
    private question_service: QuestionService,
    private router: Router
  ) {}

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .subscribe(
        (result: Array<any>) => {
          this.questions = result;
        },
        (error: NgxCSVParserError) => {
          // console.log('Error', error);
        }
      );
  }

  create_question() {
    const data = Filter_Code(this.questions);

    this.question_service
      .create_question_add_into_question_bank({
        question: data,
        questionBank_id: this.questionBank_Id,
      })
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Question Added',
          }).then(() => {
            this.router.navigate(['../']);
            this.spinner = false;
          });
        },
        (error) => this.error_handler(error)
      );
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  ngOnInit(): void {
    this.activated_route.queryParams.subscribe((params) => {
      this.questionBank_Id = params.question_bank_id;
      this.questionBank_name = params.question_bank_name;
    });
  }
}
