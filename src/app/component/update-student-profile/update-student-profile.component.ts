import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { StudentsService } from 'src/app/service/students.service';
import { SubjectService } from 'src/app/service/subject.service';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
import { FormativeData } from 'src/app/utilities/formative_data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student-profile',
  templateUrl: './update-student-profile.component.html',
  styleUrls: ['./update-student-profile.component.scss'],
})
export class UpdateStudentProfileComponent implements OnInit {
  spinner: boolean = false;
  student_id: string;
  student: any;
  update_student_profile: FormGroup;
  admin: any;
  data: any;
  selectedSubject: TreeNode[] = [];
  cols: { field: string; header: string }[];

  constructor(
    private activated_route: ActivatedRoute,
    private student_service: StudentsService,
    private fb: FormBuilder,
    private subject_service: SubjectService
  ) {
    this.cols = [{ field: 'name', header: 'Batch Name' }];
  }

  get_student_details() {
    this.spinner = true;
    this.student_service
      .get_student_details_upadte(this.student_id)
      .subscribe((res: any) => {
        this.student = res.data;

        this.student.batch_ids
          ? this.get_all_subject()
          : this.fill_pervious_details;
      });
  }

  get_all_subject() {
    this.subject_service.get_subject(false).subscribe((res: any) => {
      const subject = res.data;
      this.data = FormativeData.format_batch_data(
        this.student.batch_ids,
        subject
      );

      this.student.batch_ids.map((batch) => {
        batch.subject_ids.map((subject) => {
          this.selectedSubject.push({
            data: {
              name: subject.subject_name,
              id: subject._id,
              type: 'Subject',
              batch: batch.batch_ids.batch_name,
              batch_id: batch.batch_ids._id,
            },
          });
        });
      });

      this.fill_pervious_details();
    });
  }

  fill_pervious_details() {
    this.update_student_profile.controls.name.patchValue(this.student.name);
    this.update_student_profile.controls.email.patchValue(this.student.email);
    this.update_student_profile.controls.date_of_joining.patchValue(
      this.student.date_of_joining
        ? new Date(this.student.date_of_joining)
        : null
    );

    this.spinner = false;
  }

  validation() {
    this.update_student_profile = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      date_of_joining: ['', Validators.required],
    });
  }

  update_student() {
    this.spinner = true;
    const data = this.update_student_profile.getRawValue();
    const batch_ids = FormativeData.groupBy_batchID(this.selectedSubject);

    data['student_id'] = this.student_id;
    data['batch_ids'] = batch_ids;

    this.student_service.update_student_profile(data).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Student Updated',
      }).then(() => {
        this.get_student_details();
      });
    });
  }

  ngOnInit(): void {
    this.student_id = this.activated_route.snapshot.params.student_id;
    this.admin = ACTIVE_USER();
    this.get_student_details();
    this.validation();
  }
}
