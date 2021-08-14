import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../service/exam.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss'],
})
export class ExamFormComponent implements OnInit {
  exam_form: any;

  submitted: boolean = false;

  is_timed: string[] = ['Yes', 'No'];
  is_timed_show = true;

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.exam_form = this.examService.examDetails.exam_form;
    console.log(this.examService.examDetails);
  }

  timedChange(event) {
    this.is_timed_show = !this.is_timed_show;
    this.exam_form.exam_duration = null;
    this.examService.examDetails.exam_form['exam_duration'] = null;
  }

  nextPage() {
    this.submitted = true;
    this.examService.examDetails.exam_form = this.exam_form;
    if (this.exam_form.exam_name && this.exam_form.is_timed) {
      if (this.exam_form.is_timed == 'Yes' && !this.exam_form.exam_duration)
        return;
      else this.router.navigate(['main/create-exam/instruction']);

      return;
    }

    
  }
}
