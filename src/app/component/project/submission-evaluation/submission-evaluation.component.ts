import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submission-evaluation',
  templateUrl: './submission-evaluation.component.html',
  styleUrls: ['./submission-evaluation.component.scss']
})
export class SubmissionEvaluationComponent implements OnInit {

  submittion;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.submittion = this.projectService.getSubmittion();
    if(!this.submittion){
      this.router.navigate(['/main/project/project-evaluation']);
    }else{

      console.log(this.submittion);
      
    }
  }


 
}
