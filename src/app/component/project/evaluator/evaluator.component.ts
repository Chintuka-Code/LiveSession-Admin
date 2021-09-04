import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.scss']
})
export class EvaluatorComponent implements OnInit {

  batch_id:string = '';
  spinner: boolean = false;
  evaluator_list = [];
  evaluator
  constructor(
    private activated_route: ActivatedRoute,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.activated_route.queryParams.subscribe((params) => {
      this.batch_id = params.batch_id;
      console.log(this.batch_id);
      
    });
    this.getEvaluator();
  }

  evaluatorChange(event){
    console.log(event.value);
    
  }

  createEvaluator(){
    let data = {evaluator:this.evaluator, batch_id:this.batch_id}
    this.projectService.create_evaluator(data).subscribe((res:any)=>{
      // this.evaluator_list = res.data
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Project Assigned',
      }).then(() => {
        this.spinner = false;
       
      });
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage,
      }).then(() => {
        this.spinner = false;
      });
    })
  
  }

  getEvaluator(){
    this.projectService.get_evaluator().subscribe((res:any)=>{
      this.evaluator_list = res.data
      console.log(res);
      
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.errorMessage,
      }).then(() => {
        this.spinner = false;
      });
    })
  }

}
