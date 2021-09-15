import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../service/exam.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-exam-submission',
  templateUrl: './student-exam-submission.component.html',
  styleUrls: ['./student-exam-submission.component.scss']
})
export class StudentExamSubmissionComponent implements OnInit {

  spinner: boolean = false;
  exam_submission_list:any[] = [];
  exam_id:string = '';
  email:string = '';
  answerUrl:string = '';

  constructor(private router: Router, private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('exam_id');
    this.email = this.route.snapshot.paramMap.get('email');
    this.getStudentExamSubmission(this.exam_id, this.email);
   this.answerUrl = `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/`
  }


  getStudentExamSubmission(exam_id, email){

    this.spinner = true;
    this.examService.get_student_exam_submission(exam_id, email).subscribe(
      (res: any) => {
        console.log(res);
        this.exam_submission_list = res.data;
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


  getViewAnswerUrl(submission){
    if(submission.section?.length){
      return `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/show-answer/${submission.email}?submission_id=${submission._id}`;
    }else{
      return `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/answer/${submission.email}?submission_id=${submission._id}`;
    }
  }

}
