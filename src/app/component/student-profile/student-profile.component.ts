import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BatchService } from 'src/app/service/batch.service';
import { CourseService } from 'src/app/service/course.service';
import { StudentsService } from 'src/app/service/students.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
})
export class StudentProfileComponent implements OnInit {
  spinner: boolean = false;
  user_info: any;
  student_info: any;
  student_id: string;
  constructor(
    private student_service: StudentsService,
    private activated_route: ActivatedRoute,
    private batch_service: BatchService,
    private subject_service: SubjectService,
    private course_service: CourseService
  ) {}

  // get current user profile
  get_student_info() {
    this.spinner = true;
    this.student_service.get_student_by_id(this.student_id).subscribe((res) => {
      this.student_info = res.data();
      this.student_info.batch_ids.length != 0
        ? this.get_all_info()
        : (this.spinner = false);
    });
  }

  async get_all_info() {
    this.spinner = true;

    await Promise.all(
      this.student_info.batch_ids.map(async (batch) => {
        // get batch details
        const batch_response = await this.batch_service
          .get_batch_details_by(batch.batch_ids)
          .toPromise();
        const batch_details: any = batch_response.data();

        // get course details
        // const course_response = await this.course_service
        //   .get_course_details_by_id(batch_details.course_id)
        //   .toPromise();
        // batch_details['course_details'] = course_response.data();
        // // add batch details into batch object
        // batch['batch_details'] = batch_details;

        // Get All subject List
        await Promise.all(
          batch.subject.map(async (sub) => {
            const subject_response = await this.subject_service
              .get_subject_by_id(sub)
              .toPromise();

            batch.subject_details === undefined
              ? (batch.subject_details = [subject_response.data()])
              : batch.subject_details.push(subject_response.data());
          })
        );
      })
    );

    console.log(this.student_info);
    this.spinner = false;
  }

  ngOnInit(): void {
    this.student_id = this.activated_route.snapshot.params.student_id;
    this.get_student_info();
  }
}
