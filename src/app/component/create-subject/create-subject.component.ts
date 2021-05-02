import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/service/permission.service';
import { SubjectService } from 'src/app/service/subject.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
})
export class CreateSubjectComponent implements OnInit {
  create_subject_form: FormGroup;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private subject_service: SubjectService,
    private activated_route: ActivatedRoute,
    private router: Router,
    private permission_service: PermissionService
  ) {}

  validation() {
    this.create_subject_form = this.fb.group({
      subject: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  get subject() {
    return this.create_subject_form.get('subject') as FormArray;
  }

  addsubject() {
    this.subject.push(new FormControl('', Validators.required));
  }

  remove_subject(index: number) {
    if (this.subject.length > 1) {
      this.subject.removeAt(index);
    }
  }

  async create_subject() {
    this.spinner = true;
    const subject = this.subject.getRawValue();

    try {
      await Promise.all(
        subject.map(async (sub) => {
          await this.subject_service.create_subject({ subject_name: sub });
        })
      );
      Swal.fire({
        icon: 'success',
        title: 'Yeah...',
        text: 'Subject Created',
      }).then(() => {
        this.create_subject_form.reset();
        this.subject.clear();
        this.addsubject();
        this.spinner = false;
      });
    } catch (error) {
      console.log(error);
      this.spinner = false;
    }
  }

  check_permission() {
    this.spinner = !this.spinner;
    this.activated_route.data.subscribe(async (res) => {
      try {
        const response = await this.permission_service.check_role(res.role);
        console.log(res.role);
        if (response) {
          this.spinner = !this.spinner;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Access Denied',
          }).then(() => {
            this.router.navigate(['/main']);
            this.spinner = !this.spinner;
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.validation();
    this.check_permission();
  }
}
