import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  spinner: boolean = false;
  show_question_count_max = 1;
  show_question_count_min = 1;
  selected_question = []
  question_banks = [];
  QB_questions = [];
  exam_form;

  constructor(
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selected_question = this.examService.examDetails.selected_question;
    this.exam_form = this.examService.examDetails.exam_form;
    this.get_question_banks()
    if(this.selected_question['question_bank']){
      this.get_question_by_qb(this.selected_question['question_bank']);
    }
  }


  questionBankChange(event){
    console.log(event.value);
    this.get_question_by_qb(event.value);
    
  }
  questionChange(event){
    console.log(event.value);
    let max = event.value.length
    this.show_question_count_max = max;
    this.exam_form['show_question_count'] = max;

    var group = event.value.reduce((r, a) => {
     
      r[a.question_bank_id] = [...r[a.question_bank_id] || [], a];
      return r;
     }, {});

   
     let qArr = [];
     for (const [key, value] of Object.entries(group)) {
     
      qArr.push({question_bank_id:key, questions:value})
    }

    this.examService.examDetails.questions = qArr

  }



  prevPage() {
      this.router.navigate(['main/create-exam/settings']);
  }

  nextPage() {
    // this.examService.examDetails.attempts = this.attempts;
    // this.submitted = true;
    // console.log(this.examService.examDetails.questions);
    this.router.navigate(['main/create-exam/publish']);
  }



  get_question_banks() {
    this.spinner = true;
    this.examService.get_all_question_bank().subscribe(
      (res: any) => {
        // console.log(res);
        this.question_banks = res.data
        this.spinner = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  get_question_by_qb(ids:[]){

// console.log(ids);

    this.spinner = true;
    this.examService.get_question_by_qb(ids).subscribe(
      (res: any) => {
     

        this.QB_questions = res.data
        console.log(this.QB_questions);
        
        this.spinner = false;
      
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }
}

