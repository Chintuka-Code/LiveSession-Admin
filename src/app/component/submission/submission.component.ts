import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../service/exam.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {

  spinner: boolean = false;
  exam_submission_list:any[] = [];
  exam_id:string = '';
  constructor(private router: Router, private examService: ExamService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('exam_id');
    this.getAllSubmission(this.exam_id);
  }


  getAllSubmission(exam_id){

    this.examService.get_all_submission(exam_id).subscribe(
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

}
