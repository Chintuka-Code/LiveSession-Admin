import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../../service/exam.service'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss']
})
export class AttemptsComponent implements OnInit {
  // create_exam_form: FormGroup;
  spinner: boolean = false;
  // access_control: string[] = ['Any one with link', 'restrict with email'];
  // is_access_control = true;
  // selectedCities4:any;
  access_setting = {}
  submitted: boolean = false;
  // question = ['q1','q2','q3'];
  batchList = [];

  batchStudents = [];

  selectedCity1: any;

  access_control_opt = [
    { cname: 'Any one with link', code: 'Any one with link'},
    { name: 'Restrict with email', code: 'restrict with email', 
      restrict_opt: [
          { cname: 'Align with batch', code:'align with batch' },
          { cname: 'Manual enter email', code:'manual enter email' },
      ]
    },  
  ];


  constructor(
    // private fb: FormBuilder,
    private examService: ExamService,
    private router: Router
  ) { }

  ngOnInit(): void {
 
    this.access_setting = this.examService.examDetails.access_setting;
    
    

    if(this.access_setting['access_control'] == 'align with batch')
      this.get_batch()
      if(this.access_setting['batch'])
        this.get_students_by_batch(this.access_setting['batch'])
  }




  timedChange(event){
console.log(event.value);

    if(event.value == 'align with batch'){
      this.get_batch();
    }
   
      // this.is_access_control =!this.is_access_control; 
  }

  batchChange(event){
    
    this.get_students_by_batch(event.value)
  }

  nextPage() {
    this.examService.examDetails.access_setting = this.access_setting;
    
    if(this.access_setting['max_attempt'] && this.access_setting['access_control']){

      // if(this.access_setting['access_control'] == 'Any one with link'){

      //   this.router.navigate(['main/create-exam/settings']);
      // }else{
      //   if(this.access_setting['access_control'] == 'align with batch' && this.access_setting['batch'] && this.access_setting['student']){
      //     this.router.navigate(['main/create-exam/settings']);
      //   }

      //   if(this.access_setting['access_control'] == 'manual enter email' && this.access_setting['student']){

      //   }
      // }
      this.router.navigate(['main/create-exam/settings']);

      
    }
    
    this.submitted = true;

  }

  prevPage() {
      this.router.navigate(['main/create-exam/instruction']);
  }


  get_batch() {
    this.spinner = true;
    this.examService.get_all_batch().subscribe(
      (res: any) => {
        this.batchList = res.batch;
        this.spinner = false;
        console.log(this.batchList);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }

  get_students_by_batch(ids:[]){

// console.log(ids);

    this.spinner = true;
    this.examService.get_students_by_batch(ids).subscribe(
      (res: any) => {
        console.log(res);
        this.batchStudents = res.data;
        
        
        this.spinner = false;
      
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
        });
      }
    );
  }
}
