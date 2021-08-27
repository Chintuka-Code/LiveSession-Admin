import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchService } from 'src/app/service/batch.service';
import { StudentsService } from 'src/app/service/students.service';
import { SubjectService } from 'src/app/service/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-batch',
  templateUrl: './change-batch.component.html',
  styleUrls: ['./change-batch.component.scss'],
})
export class ChangeBatchComponent implements OnInit {
  all_batch: any[] = [];
  student_batch: any[] = [];
  all_subject: any[] = [];
  student_id: string;
  spinner: boolean = false;
  change_batch_form: FormGroup;
  student: any[] = [];

  constructor(
    private batch_service: BatchService,
    private student_service: StudentsService,
    private subject_service: SubjectService,
    private activated_route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  get_all_batch() {
    this.spinner = true;

    this.batch_service.get_batch_change().subscribe((res: any) => {
      this.all_batch = res.data;
      // console.log(this.all_batch);
      this.get_all_subject();
    });
  }

  get_all_subject() {
    this.subject_service.get_subject(false).subscribe((res: any) => {
      this.all_subject = res.data;
      // console.log(this.all_subject);
      this.get_student_batch();
    });
  }

  get_student_batch() {
    this.student_service
      .get_student_batch(this.student_id)
      .subscribe((res: any) => {
        const student = res.data.batch_ids;
        this.student = student;
        this.all_batch.forEach((batch) => {
          if (student.some((stu) => batch._id === stu.batch_ids)) {
            this.student_batch.push(batch);
          }
        });
        if (!(this.student_batch.length > 1)) {
          this.change_batch_form.controls.changed_batch.patchValue(
            student[0].batch_ids
          );
        }

        this.spinner = false;
      });
  }

  error_handler(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.errorMessage,
    }).then(() => {
      this.spinner = false;
      this.router.navigate(['/main']);
    });
  }

  validation() {
    this.change_batch_form = this.fb.group({
      changed_batch: ['', Validators.required],
      new_batch: ['', Validators.required],
      subject_ids: ['', Validators.required],
    });
  }

  changed_batch() {
    const data = this.change_batch_form.getRawValue();
    this.spinner = true;

    const batch = {
      batch: {
        active: true,
        batch_ids: data.new_batch,
        subject_ids: data.subject_ids,
      },
      index: this.student.findIndex(
        (sti) => sti.batch_ids === data.changed_batch
      ),
      student_id: this.student_id,
    };

    this.student_service.change_batch(batch).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Batch Changed',
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main/students-details/students']);
        });
      },
      (error) => {
        this.error_handler(error);
      }
    );
  }

  ngOnInit(): void {
    this.student_id = this.activated_route.snapshot.params.student_id;
    this.get_all_batch();
    this.validation();
  }
}
