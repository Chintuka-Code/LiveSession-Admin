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
  access_setting = {access_control:{cname:'', code:''}}
  submitted: boolean = false;
  question = ['q1','q2','q3'];
  batchList = ['b1','b2','b3'];
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
    this.access_setting = this.examService.examDetails.access_setting;
  }




  timedChange(event){
    console.log(event.value);
   
      this.is_access_control =!this.is_access_control; 
      console.log(this.access_setting.access_control.code);
      

    
  }

  batchChange(){
    console.log('khkh');
    
  }

  nextPage() {
    this.examService.examDetails.access_setting = this.access_setting;
    this.submitted = true;
    this.router.navigate(['main/create-exam/settings']);
  }

  prevPage() {
      this.router.navigate(['main/create-exam/instruction']);
  }
}
