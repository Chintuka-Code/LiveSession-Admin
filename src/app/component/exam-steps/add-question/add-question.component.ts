import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  questions ={

  } 
  question_bank = ['qb1','qb2', 'qb3'];
  question = ['q1','q2','q3'];
  constructor(
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.questions = this.examService.examDetails.questions;
  }


  questionBankChange(event){

  }
  questionChange(event){

  }

  nextPage() {
    this.examService.examDetails.questions = this.questions;
    // this.router.navigate(['main/create-exam/attempts']);

  }

  prevPage() {
      this.router.navigate(['main/create-exam/settings']);
  }

}
