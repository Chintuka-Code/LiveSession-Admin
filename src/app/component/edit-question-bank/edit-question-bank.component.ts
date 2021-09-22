import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionBankService } from 'src/app/service/question-bank.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-question-bank',
  templateUrl: './edit-question-bank.component.html',
  styleUrls: ['./edit-question-bank.component.scss'],
})
export class EditQuestionBankComponent implements OnInit {
  question_bank_Id: string | number;
  spinner: boolean = false;
  edit_question_bank_form: FormGroup;
  difficulty: string[] = ['Beginner', 'Proficient', 'Expert'];
  questionList: any[] = [];
  selectedProduct3: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private question_bank_service: QuestionBankService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  questions_details() {
    this.spinner = true;
    this.question_bank_service
      .get_question_details_Id(this.question_bank_Id)
      .subscribe(
        (res: any) => {
          this.patchValues(res.data);
          this.questionList = res.data.question;

          console.log(this.questionList);
          this.selectedProduct3 = this.questionList;
        },
        (error) => this.error_handler(error)
      );
  }

  validation() {
    this.edit_question_bank_form = this.fb.group({
      question_bank_name: ['', Validators.required],
      chapter_name: ['', Validators.required],
      description: [''],
      difficulty: ['', Validators.required],
    });
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

  edit_question_bank() {
    this.spinner = true;
    const data = this.edit_question_bank_form.getRawValue();
    // data.question = this.questionList.map((question) => {
    //   const exist = this.selectedProduct3.some(
    //     (selectedQuestion) =>
    //       selectedQuestion.question_id._id == question.question_id._id
    //   );
    //   question.disabled = exist ? false : true;
    //   return {
    //     disabled: question.disabled,
    //     question_id: question.question_id._id,
    //     _id: question._id,
    //   };
    // });
    data.question = this.questionList.map((question) => {
      return {
        _id: question._id,
        question_id: question.question_id._id,
        disabled: question.disabled,
      };
    });
    console.log(data);
    this.question_bank_service
      .update_question_details_Id(data, this.question_bank_Id)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinner = false;
        },
        (error) => this.error_handler(error)
      );
  }

  patchValues(data) {
    this.edit_question_bank_form.controls.question_bank_name.patchValue(
      data.question_bank_name
    );
    this.edit_question_bank_form.controls.chapter_name.patchValue(
      data.chapter_name
    );
    this.edit_question_bank_form.controls.difficulty.patchValue(
      data.difficulty
    );
    this.edit_question_bank_form.controls.description.patchValue(
      data.description
    );
    this.spinner = false;
  }

  onRowSelect(event) {
    console.log(event);
  }

  onRowUnselect(event) {
    console.log(event);
  }

  OnInputChange(data) {
    console.log(data);
    console.log(data.disabled);
    this.questionList = this.questionList.map((ques) => {
      console.log(ques);
      if (ques._id === data._id) {
        ques['disabled'] = !data.disabled;
      }
      return ques;
    });
  }

  ngOnInit(): void {
    this.question_bank_Id =
      this.activatedRoute.snapshot.params.question_bank_id;
    this.questions_details();
    this.validation();
  }
}
