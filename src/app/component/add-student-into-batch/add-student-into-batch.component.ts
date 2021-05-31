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
  student: any[];
  selected_student: any[] = [];
  batch_name: string;
  constructor(
    private activated_route: ActivatedRoute,
    private batch_service: BatchService,
    private course_service: CourseService,
    private student_service: StudentsService
  ) {}

  async get_batch_details() {
    this.batch_service
      .get_batch_details_for_addStudent(this.batch_id)
      .subscribe(
        (res: any) => {
          this.batch_details = res.data;
          this.get_all_students();
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

  get_all_students() {
    this.spinner = true;
    this.student_service.get_unassigned_batch_students().subscribe(
      (res: any) => {
        const student = res.data;
        student.map(
          (stu) =>
            (stu.batch_ids = [
              {
                batch_ids: this.batch_id,
                subject_ids: this.batch_details.course_id.subject_ids,
                active: true,
              },
            ])
        );
        this.student = student;

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

  async add_student() {
    this.spinner = true;
    this.student_service
      .add_student_into_batch(this.selected_student)
      .subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Yeah...',
            text: 'Student Added',
          });
          this.selected_student = [];
          this.get_all_students();
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

  ngOnInit(): void {
    this.batch_id = this.activated_route.snapshot.params.batch_id;
    this.batch_name = this.activated_route.snapshot.params.batch_name;
    this.get_batch_details();
  }
}
