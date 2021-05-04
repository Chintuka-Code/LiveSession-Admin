import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { CourseService } from 'src/app/service/course.service';
import { StudentsService } from 'src/app/service/students.service';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student-into-batch',
  templateUrl: './add-student-into-batch.component.html',
  styleUrls: ['./add-student-into-batch.component.scss'],
})
export class AddStudentIntoBatchComponent implements OnInit {
  spinner: boolean = false;
  batch_id: string;
  batch_details: any;
  course_details: any;
  students: any[];
  selected_student: any[] = [];
  constructor(
    private activated_route: ActivatedRoute,
    private batch_service: BatchService,
    private course_service: CourseService,
    private student_service: StudentsService
  ) {}

  async get_batch_details() {
    this.spinner = true;
    const batch_details: any = await this.batch_service
      .get_batch_details_by(this.batch_id)
      .toPromise();
    this.batch_details = batch_details.data();
    const course_details: any = await this.course_service
      .get_course_details_by_id(batch_details.data().course_id)
      .toPromise();
    this.course_details = course_details.data();
    this.get_all_students(course_details.data());
  }

  get_all_students(course) {
    this.spinner = true;
    this.student_service.get_unassigned_batch_students().subscribe((res) => {
      const student = FormativeData.format_firebase_get_request_data(res);
      student.map(
        (stu) =>
          (stu.batch_ids = [
            {
              batch_ids: this.batch_id,
              subject: course.subject_ids,
              active: true,
            },
          ])
      );
      this.students = student;
      this.spinner = false;
    });
  }

  async add_student() {
    this.spinner = true;

    try {
      await Promise.all(
        this.selected_student.map(async (student) => {
          await this.student_service.add_student_into_batch(student);
        })
      );
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Student Added',
      });
      this.selected_student = [];
      this.get_all_students(this.course_details);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'ooh...',
        text: 'Something Went Wrong',
      });
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.batch_id = this.activated_route.snapshot.params.batch_id;
    this.get_batch_details();
  }
}
