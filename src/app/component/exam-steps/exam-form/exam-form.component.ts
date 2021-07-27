import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-form.component.scss']
})
export class ExamFormComponent implements OnInit {

  create_exam_form: FormGroup;
  is_timed: string[] = ['Yes', 'No'];
  is_timed_show = true;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validation();
  }

  validation() {
    this.create_exam_form = this.fb.group({
      exam_name: ['', Validators.required],
      is_timed: ['Yes', Validators.required],
      exam_duration: ['', ],
   
    });
  }

  exam_form_submit(){
    console.log('mkkl');
    
  }

  timedChange(event){
    console.log(event.value);
   
      this.is_timed_show =!this.is_timed_show; 
    console.log(this.is_timed_show);
    
  }




}
