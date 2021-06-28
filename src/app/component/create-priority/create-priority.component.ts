import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PriorityService } from 'src/app/service/priority.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-priority',
  templateUrl: './create-priority.component.html',
  styleUrls: ['./create-priority.component.scss'],
})
export class CreatePriorityComponent implements OnInit {
  spinner: boolean = false;
  create_priority_form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private priority_service: PriorityService,
    private router: Router
  ) {}

  validation() {
    this.create_priority_form = this.fb.group({
      priority: new FormArray([new FormControl('', Validators.required)]),
    });
  }

  get priority() {
    return this.create_priority_form.get('priority') as FormArray;
  }

  addpriority() {
    this.priority.push(new FormControl('', Validators.required));
  }

  remove_priority(index: number) {
    if (this.priority.length > 1) {
      this.priority.removeAt(index);
    }
  }

  create_priority() {
    this.spinner = true;
    const data = this.create_priority_form.getRawValue();
    this.priority_service.create_priority(data).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Priority Created',
        }).then(() => {
          this.create_priority_form.reset();
          this.priority.clear();
          this.addpriority();
          this.spinner = false;
        });
      },
      (error) => {
        console.log(error);
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

  ngOnInit(): void {
    this.validation();
  }
}
