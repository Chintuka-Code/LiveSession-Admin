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
  new_created: boolean = true;

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
          no_of_answer: [''],
          option: this.fb.array([]),
          multiple_answer: this.fb.array([]),
          right_answer: [''],
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
        no_of_answer: [''],
        option: this.fb.array([]),
        multiple_answer: this.fb.array([]),
        right_answer: [''],
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
    control.push(this.fb.control(null));
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

  // when question type is selected
  type_selected(comp) {
    const value = comp.get('type').value;
    switch (value) {
      case 'radio':
        const control = comp.controls['right_answer'] as FormControl;
        control.clearValidators();
        break;
      case 'checkbox':
        console.log('option required');
        break;
      case 'singleInput':
        console.log('Answer Required');
        break;
      case 'multipleInput':
        console.log('Multiple Answer Required');
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
    this.spinner = true;
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
              text: 'Priority Created',
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
    this.addNewOption(this.questionFormArr.controls[0].get('option'));
    this.addNewAnswer(this.questionFormArr.controls[0].get('multiple_answer'));
    this.activated_route.queryParams.subscribe((params) => {
      this.questionBank_Id = params.question_bank_id;
      this.questionBank_name = params.question_bank_name;
    });
  }
}
