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

  groupedCities = [
    {
        label: 'Germany', value: 'de', 
        items: [
            {label: 'Berlin', value: 'Berlin'},
            {label: 'Frankfurt', value: 'Frankfurt'},
            {label: 'Hamburg', value: 'Hamburg'},
            {label: 'Munich', value: 'Munich'}
        ]
    },
    {
        label: 'USA', value: 'us', 
        items: [
            {label: 'Chicago', value: 'Chicago'},
            {label: 'Los Angeles', value: 'Los Angeles'},
            {label: 'New York', value: 'New York'},
            {label: 'San Francisco', value: 'San Francisco'}
        ]
    },
    {
        label: 'Japan', value: 'jp', 
        items: [
            {label: 'Kyoto', value: 'Kyoto'},
            {label: 'Osaka', value: 'Osaka'},
            {label: 'Tokyo', value: 'Tokyo'},
            {label: 'Yokohama', value: 'Yokohama'}
        ]
    }
];

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

  publish() {
    this.examService.examDetails.questions = this.questions;
    
    // this.router.navigate(['main/create-exam/attempts']);

  }
  create() {
    this.examService.examDetails.questions = this.questions;

    // this.router.navigate(['main/create-exam/attempts']);

  }

  prevPage() {
      this.router.navigate(['main/create-exam/settings']);
  }

  nextPage() {
    // this.examService.examDetails.attempts = this.attempts;
    // this.submitted = true;
    this.router.navigate(['main/create-exam/publish']);
  }

}
