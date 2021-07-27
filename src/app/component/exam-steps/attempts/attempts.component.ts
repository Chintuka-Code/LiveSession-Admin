import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss']
})
export class AttemptsComponent implements OnInit {
  create_exam_form: FormGroup;
  access_control: string[] = ['Any one with link', 'restrict with email'];
  is_access_control = true;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validation()
  }

  validation() {
    this.create_exam_form = this.fb.group({
      max_attempt: ['', Validators.required],
      access_control: ['', Validators.required],
      manual_email: ['', Validators.required],
    
   
    });
  }

  exam_form_submit(){
    console.log('mkkl');
    
  }


  timedChange(event){
    console.log(event.value);
   
      this.is_access_control =!this.is_access_control; 

    
  }
}
