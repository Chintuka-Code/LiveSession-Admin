import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  studentSubmissions:any
  spinner:boolean = false;
  submissionStatus = ['new', 'rejected', 'evaluated' ]
  projectDetails;
  isAccepted:boolean = false;
  isRejected:boolean = false;
  totalMarks:Number = 0;
  remark:string = '';
  schime =[];

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.studentSubmissions = this.projectService.getStudentDeatail();
    if(!this.studentSubmissions){
      this.router.navigate(['/main/project/project-evaluation']);
    }else{
      this.getProject(this.studentSubmissions.project_id._id)
      console.log(this.studentSubmissions);
    }
    
  }

  getProject(project_id){
    this.projectService.getProject(project_id).subscribe((res:any)=>{
      
      console.log(res);
    this.projectDetails =res.data;
     
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


  // submittionEvaluation(submittion){

  //   this.projectService.submittion = submittion;
  //   this.router.navigate(['/main/project/submittion-evaluation']);
  // }


  // validation() {
  //   this.create_project_form = this.fb.group({
  //     name: ['', Validators.required],
  //     project_category: ['', Validators.required],
  //     description: ['', Validators.required],
  //     tags: ['', ],
  //     total_marks: ['', ],
  //     is_marking_scheme:[false, Validators.required],
  //     marking_schemes: this.fb.array([this.marking_schemes_form()]),
     
  //     links: new FormArray([new FormControl('', )]),
  //   });
  // }

  accept(){
    this.isAccepted = !this.isAccepted;
    this.isRejected = false;
  }
  reject(){
    this.isAccepted =false;
    this.isRejected = !this.isRejected;
  }

  submit(){
    console.log(this.totalMarks);
    console.log(this.remark);
    console.log(this.schime);
    
  }

}
