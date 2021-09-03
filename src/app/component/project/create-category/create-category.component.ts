import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {


  create_category_form: FormGroup;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activated_route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.validation()
  }


  validation() {
    this.create_category_form = this.fb.group({
      subject: new FormArray([new FormControl('', Validators.required)]),
    });
  }


  get subject() {
    return this.create_category_form.get('subject') as FormArray;
  }

  addCategory() {
    this.subject.push(new FormControl('', Validators.required));
  }

  removeCategory(index: number) {
    if (this.subject.length > 1) {
      this.subject.removeAt(index);
    }
  }


  async create_category() {
    this.spinner = true;
    const subject = this.subject.getRawValue();

    console.log(subject);
    
    this.projectService.create_category(subject).subscribe(
      (res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Category Created',
        }).then(() => {
          this.create_category_form.reset();
          this.subject.clear();
          this.addCategory();
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

}
