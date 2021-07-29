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
  selectedCities4:any;
  attempts = {access_control:{cname:'', code:''}}
  submitted: boolean = false;
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




selectedCity1: any;

countries = [
  {
      cname: 'Any one with link',
      code: 'Any one with link',
     
  },
  {
      name: 'Restrict with email', 
      code: 'restrict with email',
      states: [
        {
          cname: 'Align with batch', code:'align with batch'
            
        },
        {
          cname: 'Manual enter email', code:'manual enter email'
        },
        
    ]
  },
  
];


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
    // this.examService.examDetails.attempts = event.value;
      this.is_access_control =!this.is_access_control; 
      console.log(this.attempts.access_control.code);
      

    
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
