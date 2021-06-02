import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  create_category_form: FormGroup;
  feature_type: any[] = [];
  spinner: boolean = false;

  constructor(
    private category_service: CategoryService,
    private fb: FormBuilder
  ) {
    this.feature_type = ['Ticket', 'Chat', 'Knowledge'];
  }

  create_category() {
    this.spinner = true;
    const data = this.create_category_form.getRawValue();
    this.category_service.create_category(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Category Created',
        }).then(() => {
          this.spinner = false;
          this.create_category_form.reset();
        });
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

  validation() {
    this.create_category_form = this.fb.group({
      category_name: ['', Validators.required],
      feature_in: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.validation();
  }
}
