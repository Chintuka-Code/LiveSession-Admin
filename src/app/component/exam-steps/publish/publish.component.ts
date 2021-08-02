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

    console.log(this.examService.examDetails);
    
    // this.router.navigate(['main/create-exam/publish']);
  }

}
