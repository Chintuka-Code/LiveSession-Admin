import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-batch-project',
  templateUrl: './batch-project.component.html',
  styleUrls: ['./batch-project.component.scss']
})
export class BatchProjectComponent implements OnInit {

  batchDetail;
  projectSubmissions = [];
  batchSubmission = [];
  spinner:boolean = false;
  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.batchDetail = this.projectService.getBatchDetail();
    this.batchSubmission = this.projectService.getBatchSubmission();
    if(!this.batchDetail){
      this.router.navigate(['/main/project/project-evaluation']);
    }
  }

  statusCount(project_id, status){
    return this.batchSubmission.filter(data => data.project_id._id === project_id && data.status === status).length;

  }

  submitedStudents(project){


    let students = this.batchSubmission.filter(data => data.project_id._id === project.project_id)
    this.projectService.students = students;
    this.projectService.assignedProjectDetail = project;

    return this.router.navigate(['/main/project/student-submission']);
    
    
  }

}
