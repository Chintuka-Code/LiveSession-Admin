import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
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
  evaluation_form: FormGroup;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.studentSubmissions = this.projectService.getStudentDeatail();
    if(!this.studentSubmissions){
      this.router.navigate(['/main/project/project-evaluation']);
    }else{
      this.getProject(this.studentSubmissions.project_id._id)
      console.log(this.studentSubmissions);
      this.validation();
    }
    
  }

  getProject(project_id){
    this.spinner = true;
    this.projectService.getProject(project_id).subscribe((res:any)=>{
      
      console.log(res);
    this.projectDetails =res.data;
    this.evaluation_form.patchValue({
      total_marks:this.projectDetails.total_marks,
      is_marking_scheme:this.projectDetails.is_marking_scheme,
    })
    console.log(this.projectDetails.marking_schemes);
    
    this.projectDetails.marking_schemes.forEach(element => {
      this.addMarkingScheme(element);
    });
   
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
    })
  }


  // submittionEvaluation(submittion){

  //   this.projectService.submittion = submittion;
  //   this.router.navigate(['/main/project/submittion-evaluation']);
  // }


  validation() {
    this.evaluation_form = this.fb.group({
      total_marks: ['', ],
      remark: ['', ],
      is_marking_scheme:[false, Validators.required],
      marking_schemes: this.fb.array([]),
    });
  }

  marking_schemes_form(element) {
    return this.fb.group({
      name: [element.name, Validators.required],
      value: [element.value, Validators.required],
      
    });
  }

  get marking_schemes() {
    return this.evaluation_form.get('marking_schemes') as FormArray;
  }

    addMarkingScheme(element) {
      this.marking_schemes.push(this.marking_schemes_form(element));
    }

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

  create_evaluation(){
    let data = this.evaluation_form.getRawValue();
    console.log(data);
    
  }

}
