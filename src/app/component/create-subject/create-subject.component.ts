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
import { Notification } from 'src/app/utilities/ACCESS_DENIED';
import { ACTIVE_USER } from 'src/app/utilities/Decode_jwt';
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
    this.subject_service.create_subject(subject).subscribe(
      (res) => {
        // console.log(res);
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
      },
      (error) => {
        // console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Ohh...',
          text: 'Something Went Wrong',
        }).then(() => {
          this.router.navigate(['/main']);
        });
      }
    );
  }

  check_permission() {
    this.spinner = !this.spinner;
    this.activated_route.data.subscribe(async (res) => {
      const user: any = ACTIVE_USER();
      // console.log(res.role);
      if (!user.permissions.includes(res.role)) {
        this.router.navigate(['/main']);
        Notification.ACCESS_DENIED();
        return '';
      }
      this.spinner = false;
    });
  }

  ngOnInit(): void {
    this.validation();
    this.check_permission();
  }
}
