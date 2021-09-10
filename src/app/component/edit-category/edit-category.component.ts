import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  feature_type: any[] = [];
  update_category_form: FormGroup;
  spinner: boolean = false;
  category_id: string;

  constructor(
    private fb: FormBuilder,
    private activated_route: ActivatedRoute,
    private category_service: CategoryService,
    private router: Router
  ) {
    this.feature_type = ['Ticket', 'Chat', 'Knowledge', 'Project'];
  }

  validation() {
    this.update_category_form = this.fb.group({
      category_name: ['', Validators.required],
      feature_in: ['', Validators.required],
    });
  }

  get_category_data() {
    this.category_service.get_category_by_id(this.category_id).subscribe(
      (res: any) => {
        this.fill_pervious_details(res.data);
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

  fill_pervious_details(category_data) {
    this.update_category_form.controls.category_name.patchValue(
      category_data.category_name
    );
    this.update_category_form.controls.feature_in.patchValue(
      category_data.feature_in
    );

    this.spinner = false;
  }

  update_category() {
    const data = this.update_category_form.getRawValue();
    data['category_id'] = this.category_id;

    this.category_service.update_category(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Course Updated',
        }).then(() => {
          this.router.navigate(['/main/view-category']);
        });
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

  ngOnInit(): void {
    this.category_id = this.activated_route.snapshot.params.category_id;
    this.validation();
    this.get_category_data();
  }
}
