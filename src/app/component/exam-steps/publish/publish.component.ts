import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
  batch_start_date
  publish:{}
  constructor(
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.publish = this.examService.examDetails.publish;
  }

  prevPage() {
    this.router.navigate(['main/create-exam/exam_question']);
  }

  examPublish() {
    // this.examService.examDetails.attempts = this.attempts;
    // this.submitted = true;
   

    let question = this.examService.examDetails.selected_question.question
   
    var group = question.reduce((r, a) => {
     
      r[a.qb_name_id] = [...r[a.qb_name_id] || [], a];
      return r;
     }, {});

     console.log("data", group);
     let qArr = [];
     for (const [key, value] of Object.entries(group)) {
     
      qArr.push({question_bamk_id:key, questions:value})
    }

    this.examService.examDetails.questions = qArr
    
    
    console.log(this.examService.examDetails);
    
    this.router.navigate(['main/create-exam/publish']);
  }

}
