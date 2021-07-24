import { Component, OnInit } from '@angular/core';
import { QUILL_TOOLBAR_SETTING } from 'src/app/utilities/quill_setting';
import 'quill-emoji/dist/quill-emoji.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { SubjectService } from 'src/app/service/subject.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { QuestionBankService } from 'src/app/service/question-bank.service';

@Component({
  selector: 'app-create-question-bank',
  templateUrl: './create-question-bank.component.html',
  styleUrls: ['./create-question-bank.component.scss'],
})
export class CreateQuestionBankComponent implements OnInit {
  spinner: boolean = false;
  subject: any = [];
  difficulty: string[] = ['Beginner', 'Proficient', 'Expert'];
  modules = {};
  user_info: any;

  create_question_bank_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subject_service: SubjectService,
    private router: Router,
    private question_bank_service: QuestionBankService
  ) {
    this.modules = QUILL_TOOLBAR_SETTING;
  }

  get_user_info() {
    this.spinner = true;
    this.user_info = ACTIVE_USER();
    this.get_subject_list();
  }

  get_subject_list() {
    this.subject_service.get_subject(false).subscribe(
      (res: any) => {
        this.subject = res.data;
        console.log(this.subject);
        this.spinner = false;
      },
      (error) => {
        this.error_handler(error);
      }
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

  validation() {
    this.create_question_bank_form = this.fb.group({
      question_bank_name: ['', Validators.required],
      subject_id: ['', Validators.required],
      chapter_name: ['', Validators.required],
      description: [''],
      difficulty: ['', Validators.required],
    });
  }

  create_question_bank() {
    this.spinner = true;
    const data = this.create_question_bank_form.getRawValue();
    this.question_bank_service.create_question_bank(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Question Bank Created',
        }).then(() => this.create_question_bank_form.reset());
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }
  W;

  ngOnInit(): void {
    this.validation();
    this.get_user_info();
  }
}
