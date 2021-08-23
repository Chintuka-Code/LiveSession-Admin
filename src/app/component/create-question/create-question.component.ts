import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/service/question.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  spinner: boolean = false;
  myForm: FormGroup;
  type: { name: String; type: String }[] = [];
  questionBank_name: String;
  questionBank_Id: String;
  creation_type: String = 'new_created';

  constructor(
    private activated_route: ActivatedRoute,
    private fb: FormBuilder,
    private question_service: QuestionService,
    private router: Router
  ) {
    this.type = [
      { name: 'Multiple choice choose one( radio)', type: 'radio' },
      { name: 'Multiple choice choose many', type: 'checkbox' },
      { name: 'True / False(radio)', type: 'radio' },
      {
        name: 'Fill in the blank single input',
        type: 'singleInput',
      },
      {
        name: 'Fill in the blank multiple choice',
        type: 'multipleInput',
      },
    ];
  }

  validation() {
    this.myForm = this.fb.group({
      questions: this.fb.array([
        this.fb.group({
          question_name: ['', Validators.required],
          type: ['', Validators.required],
          point: ['', Validators.required],
          // no_of_answer: [''],
          option: this.fb.array([]),
          multiple_answer: this.fb.array([]),
          right_answer: ['', Validators.required],
        }),
      ]),
    });
  }

  // getter for easier access
  get questionFormArr(): FormArray {
    return this.myForm.get('questions') as FormArray;
  }

  addNewQuestion() {
    this.questionFormArr.push(
      this.fb.group({
        question_name: ['', Validators.required],
        type: ['', Validators.required],
        point: ['', Validators.required],
        option: this.fb.array([]),
        multiple_answer: this.fb.array([]),
        right_answer: ['', Validators.required],
      })
    );
    this.addNewOption(
      this.questionFormArr.controls[
        this.questionFormArr.controls.length - 1
      ].get('option')
    );

    this.addNewAnswer(
      this.questionFormArr.controls[
        this.questionFormArr.controls.length - 1
      ].get('multiple_answer')
    );
  }

  deleteQuestion(index: number) {
    this.questionFormArr.removeAt(index);
  }

  addNewOption(control) {
    control.push(this.fb.control('', Validators.required));
  }

  addNewRightAnswer(control) {
    control.push(this.fb.control('', Validators.required));
  }

  deleteRightAnswer(control, index) {
    control.removeAt(index);
  }

  deleteOption(control, index) {
    control.removeAt(index);
  }

  addNewAnswer(control) {
    control.push(this.fb.control(null));
  }

  deleteAnswer(control, index) {
    control.removeAt(index);
  }

  reset_option(i) {
    const controls = this.questionFormArr.controls[i].get(
      'option'
    ) as FormArray;
    controls.clear();
    controls.updateValueAndValidity();
  }

  reset_MultipleRightAnswer(i) {
    const controls = this.questionFormArr.controls[i].get(
      'multiple_answer'
    ) as FormArray;
    controls.clear();
    controls.updateValueAndValidity();
  }

  reset_right_answer(i) {
    const controls = this.questionFormArr.controls[i].get(
      'right_answer'
    ) as FormControl;
    controls.clearValidators();
    controls.updateValueAndValidity();
  }

  set_right_answer(i) {
    const controls = this.questionFormArr.controls[i].get(
      'right_answer'
    ) as FormControl;
    controls.setValidators(Validators.required);
    controls.updateValueAndValidity();
  }

  // set_number_of_answer(i) {
  //   const controls = this.questionFormArr.controls[i].get(
  //     'no_of_answer'
  //   ) as FormControl;
  //   controls.setValidators(Validators.required);
  //   controls.updateValueAndValidity();
  // }

  // reset_number_of_answer(i) {
  //   const controls = this.questionFormArr.controls[i].get(
  //     'no_of_answer'
  //   ) as FormControl;
  //   controls.clearValidators();
  //   controls.updateValueAndValidity();
  // }

  // when question type is selected
  type_selected(comp, i) {
    const value = comp.get('type').value;
    switch (value) {
      case 'radio':
        this.addNewOption(this.questionFormArr.controls[i].get('option'));
        this.set_right_answer(i);
        // this.reset_number_of_answer(i);
        this.reset_MultipleRightAnswer(i);
        break;
      case 'checkbox':
        this.addNewOption(this.questionFormArr.controls[i].get('option'));
        this.reset_right_answer(i);
        this.addNewRightAnswer(
          this.questionFormArr.controls[i].get('multiple_answer')
        );
        break;
      case 'singleInput':
        this.reset_option(i);
        this.set_right_answer(i);
        // this.reset_number_of_answer(i);
        this.reset_MultipleRightAnswer(i);
        // console.log('Answer Required');
        break;
      case 'multipleInput':
        this.reset_right_answer(i);
        this.reset_option(i);
        // this.set_number_of_answer(i);
        this.addNewAnswer(
          this.questionFormArr.controls[i].get('multiple_answer')
        );
        // console.log('Multiple Answer Required');
        break;
      default:
        console.log('');
    }
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

  create_company_fun() {
    const data = this.myForm.getRawValue();
    // this.spinner = true;
    console.log(data);

    if (this.questionBank_Id) {
      this.question_service
        .create_question_add_into_question_bank({
          question: data.questions,
          questionBank_id: this.questionBank_Id,
        })
        .subscribe(
          (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Yeah...',
              text: 'Question Added',
            }).then(() => {
              this.myForm.reset();
              this.spinner = false;
            });
          },
          (error) => this.error_handler(error)
        );
    } else {
      console.log('create');
    }
  }

  ngOnInit(): void {
    this.validation();
    this.activated_route.queryParams.subscribe((params) => {
      this.questionBank_Id = params.question_bank_id;
      this.questionBank_name = params.question_bank_name;
    });
  }
}
