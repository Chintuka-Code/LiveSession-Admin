import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';
import { CategoryService } from 'src/app/service/category.service';
import { QUILL_TOOLBAR_SETTING } from 'src/app/utilities/quill_setting';
import 'quill-emoji/dist/quill-emoji.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.scss'],
})
export class EditBlogComponent implements OnInit {
  spinner: boolean = false;
  blog_id: string;
  blog: any;
  category: any;
  update_blog_form: FormGroup;
  modules = {};
  html: any;
  constructor(
    private activated_route: ActivatedRoute,
    private blog_service: BlogService,
    private category_service: CategoryService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.modules = QUILL_TOOLBAR_SETTING;
  }

  get_category() {
    this.spinner = true;
    this.category_service.get_category_type('Knowledge').subscribe(
      (res: any) => {
        this.category = res.data;
        this.get_blog_details();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.errorMessage,
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main']);
        });
      }
    );
  }

  get_blog_details() {
    this.blog_service.get_blog_details_by_id(this.blog_id).subscribe(
      (res: any) => {
        this.blog = res.data;
        this.fill_previous_details();
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
    this.update_blog_form = this.fb.group({
      heading: ['', Validators.required],
      category: ['', Validators.required],
      html: ['', Validators.required],
      published: [false, Validators.required],
    });
  }

  fill_previous_details() {
    this.update_blog_form.controls.category.patchValue(this.blog.category);
    this.update_blog_form.controls.heading.patchValue(this.blog.heading);
    this.update_blog_form.controls.html.patchValue(this.blog.html);
    this.update_blog_form.controls.published.patchValue(this.blog.published);

    this.spinner = false;
  }

  changedEditor(event) {
    if (event.event === 'text-change') {
      this.convert(event.html);
    }
  }

  convert(data) {
    const dom = document.createElement('div');
    dom.innerHTML = data;
    const iframe = dom.querySelectorAll('iframe');
    iframe.forEach((element) => {
      element.src = `${element.src}&rel=0`;
    });

    this.html = `${dom.innerHTML}`;
  }

  update_blog() {
    const data = this.update_blog_form.getRawValue();
    data.html = this.html;
    data._id = this.blog_id;
    this.blog_service.update_blog(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Updated',
        }).then(() => {
          this.spinner = false;
          this.router.navigate(['/main/view-blog']);
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

  ngOnInit(): void {
    this.blog_id = this.activated_route.snapshot.params.blog_id;
    this.get_category();
    this.validation();
  }
}
