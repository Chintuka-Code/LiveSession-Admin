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
  batchList = [{_id:'1',batch_name:'b1'},{_id:'2',batch_name:'b2'}];



data =[
  {
    student_id:'1',
    email:'s1@test.com',
    batch_id:'b1'
  },
  {
    student_id:'2',
    email:'s2@test.com',
    batch_id:'b1'
  },
  {
    student_id:'3',
    email:'s3@test.com',
    batch_id:'b2'
  },
  {
    student_id:'4',
    email:'s4@test.com',
    batch_id:'b2'
  },
  {
    student_id:'5',
    email:'s5@test.com',
    batch_id:'b2'
  },
  {
    student_id:'2',
    email:'s2@test.com',
    batch_id:'b1'
    
  }
]

batchStudents = [
  {
    batch_name: 'B1', _id: '1', 
    items: [
          {email: 's1@test.com', _id: 's1', batch_id:'b1'},
          {email: 's2@test.com', _id: 's2', batch_id:'b1'},
          {email: 's3@test.com', _id: 's3', batch_id:'b1'},
          {email: 's4@test.com', _id: 's4', batch_id:'b1'},
         
      ]
  },
  {
    batch_name: 'B2', _id: '2', 
    items: [
          {email: 's11@test.com', _id: 's11', batch_id:'b2'},
          {email: 's22@test.com', _id: 's22', batch_id:'b2'},
          {email: 's33@test.com', _id: 's33', batch_id:'b2'},
          {email: 's44@test.com', _id: 's44', batch_id:'b2'},
         
      ]
  },
 
 
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
