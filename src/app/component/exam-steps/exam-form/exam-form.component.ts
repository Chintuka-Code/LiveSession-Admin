import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

  examForm: any;

  submitted: boolean = false;

  is_timed: string[] = ['Yes', 'No'];
  is_timed_show = true;

  constructor(
    private examService: ExamService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.examForm = this.examService.examDetails.examForm;
  }



  timedChange(event){
   
      this.is_timed_show =!this.is_timed_show; 

    
  }


  nextPage() {
    if (this.examForm.exam_name && this.examForm.is_timed ) {
        this.examService.examDetails.examForm = this.examForm;
        console.log(this.examForm);
        if(this.examForm.is_timed == 'Yes' && !this.examForm.exam_duration)
          return;
        else
          this.router.navigate(['main/create-exam/instruction']);
        
        return;
    }

    this.submitted = true;
}



}
