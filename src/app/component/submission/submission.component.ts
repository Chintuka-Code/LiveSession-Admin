import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../service/exam.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit {
  spinner: boolean = false;
  exam_submission_list: any[] = [];
  exam_submission_list_main: any[] = [];
  exam_id: string = '';
  answerUrl: string = '';
  max_obtan_marks = 0;
  start_date: Date;
  end_date: Date;
  constructor(
    private router: Router,
    private examService: ExamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('exam_id');
    this.getAllSubmission(this.exam_id);
    this.answerUrl = `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/`;
  }

  getAllSubmission(exam_id) {
    this.spinner = true;
    this.examService.get_all_submission(exam_id).subscribe(
      (res: any) => {
        console.log(res);
        this.exam_submission_list_main = res.data;
        this.exam_submission_list = res.data;

        let obtan_marks = this.exam_submission_list.map(
          (data) => data.total_obtain_marks
        );

        this.max_obtan_marks = Math.max(...obtan_marks);

        //  this.answerUrl = `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/show-answer/`

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

  getViewAnswerUrl(submission) {
    if (submission.section?.length) {
      return `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/show-answer/${submission.email}`;
    } else {
      return `${environment.STUDENT_BASE_SERVER_URL}/exam/${this.exam_id}/answer/${submission.email}`;
    }
  }

  filterSubmission() {
    this.exam_submission_list = this.exam_submission_list_main.filter(
      (data) => {
        let attempt_end_date: Date = new Date(data.attempt_end_date);
        attempt_end_date.setHours(0, 0, 0, 0);
        console.log(attempt_end_date);
        console.log(this.start_date);
        console.log(this.end_date);

        return (
          attempt_end_date >= this.start_date &&
          attempt_end_date <= this.end_date
        );
      }
    );
  }
}
