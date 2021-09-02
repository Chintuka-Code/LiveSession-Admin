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
  branchList = [];

  students = [];
  status = ['new', 'evaluated', 'rejected', 'not submited'];
  constructor(
    private projectService: ProjectService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    // this.studentSubmission = this.projectService.getStudentSubmission();
    this.students = this.projectService.getStudent();
   
    if(!this.students.length){
      this.router.navigate(['/main/project/project-evaluation']);
    }else{
      console.log(this.students);
      
    }
  }

  filterStudent(status){
    return this.students.filter(data => data.status === status);
  }

  studentSubmission(submissions){
    console.log(submissions);

    this.projectService.studentDetails = submissions;
    return this.router.navigate(['/main/project/submission']);
  }

  statusCount(status){
    return this.filterStudent(status).length;
  }

}
