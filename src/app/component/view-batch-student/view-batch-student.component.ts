import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';

@Component({
  selector: 'app-view-batch-student',
  templateUrl: './view-batch-student.component.html',
  styleUrls: ['./view-batch-student.component.scss'],
})
export class ViewBatchStudentComponent implements OnInit {
  spinner: boolean = false;
  batch_id: string;
  students_list: any[];
  batch_name: string;
  constructor(
    private activated_route: ActivatedRoute,
    private batch_service: BatchService
  ) {}

  get_student_list() {
    this.spinner = true;
    this.batch_service.get_student_list(this.batch_id).subscribe(
      (res: any) => {
        this.students_list = res.data;
        this.spinner = false;
      },
      (error) => this.error_handler(error)
    );
  }

  error_handler(error) {
    console.log(error);
  }

  ngOnInit(): void {
    this.batch_id = this.activated_route.snapshot.params.batch_id;
    this.batch_name = this.activated_route.snapshot.params.batch_name;
    this.get_student_list();
  }
}
