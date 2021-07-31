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

  selected_question = {
    
  }

  selectedQuestion = {}

  question_banks = [
    {
      name:'QB1',
      _id:'ww1'
    },
    {
      name:'QB2',
      _id:'ww2'
    },
    {
      name:'QB3',
      _id:'ww3'
    },
  ];

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

  questionList = [
    {
      qb_name: 'QB1', qb_name_id: '1', 
      items: [
          {name: 'q1', _id: '1', qb_name_id: 'ww1'},
          {name: 'q2', _id: '2', qb_name_id: 'ww1'},
          {name: 'q3', _id: '3', qb_name_id: 'ww1'},
          {name: 'q4', _id: '4', qb_name_id: 'ww1'}
      ]
    },
    {
      qb_name: 'QB2', qb_name_id: '2', 
      items: [
          {name: 'q11', _id: '11', qb_name_id: 'ww2'},
          {name: 'q22', _id: '22', qb_name_id: 'ww2'},
          {name: 'q33', _id: '33', qb_name_id: 'ww2'},
          {name: 'q44', _id: '44', qb_name_id: 'ww2'}
      ]
    },
  ]

  constructor(
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selected_question = this.examService.examDetails.selected_question;
  }


  questionBankChange(event){
    console.log(event.value);
    
  }
  questionChange(event){
    console.log(event.value);

  }

  publish() {
    // this.examService.examDetails.questions = this.questions;
    
    // this.router.navigate(['main/create-exam/attempts']);

  }
  create() {
    // this.examService.examDetails.questions = this.questions;

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
