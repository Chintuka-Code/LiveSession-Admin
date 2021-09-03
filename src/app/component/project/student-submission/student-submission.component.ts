import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-submission',
  templateUrl: './student-submission.component.html',
  styleUrls: ['./student-submission.component.scss']
})
export class StudentSubmissionComponent implements OnInit {

  spinner:boolean = false;
  students = [];
  status = ['new', 'evaluated', 'rejected', 'not submited'];
  batchDetail;
  
  constructor(
    private projectService: ProjectService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    
    this.students = this.projectService.getStudent();
    this.batchDetail = this.projectService.getBatchDetail();
    
    if(!this.batchDetail){
      this.router.navigate(['/main/project/project-evaluation']);
    }
  }

  filterStudent(status){
    return this.students.filter(data => data.status === status);
  }

  studentSubmission(submissions){
    this.projectService.studentSubmissionDetails = submissions;
    return this.router.navigate(['/main/project/submission']);
  }

  statusCount(status){
    return this.filterStudent(status).length;
  }

}
