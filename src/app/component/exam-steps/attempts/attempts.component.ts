import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss']
})
export class AttemptsComponent implements OnInit {
  // create_exam_form: FormGroup;
  access_control: string[] = ['Any one with link', 'restrict with email'];
  is_access_control = true;

  attempts = {}
  submitted: boolean = false;

  constructor(
    // private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.validation()
    this.attempts = this.examService.examDetails.attempts;
  }

  // validation() {
  //   this.create_exam_form = this.fb.group({
  //     max_attempt: ['', Validators.required],
  //     access_control: ['', Validators.required],
  //     manual_email: ['', Validators.required],
    
   
  //   });
  // }

  // exam_form_submit(){
  //   console.log('mkkl');
    
  // }


  timedChange(event){
    console.log(event.value);
   
      this.is_access_control =!this.is_access_control; 

    
  }


  nextPage() {
    this.examService.examDetails.attempts = this.attempts;
    this.submitted = true;
    this.router.navigate(['main/create-exam/settings']);
  }

  prevPage() {
      this.router.navigate(['main/create-exam/instruction']);
  }
}
