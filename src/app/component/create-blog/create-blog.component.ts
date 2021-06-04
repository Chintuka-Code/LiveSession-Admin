import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'quill-emoji/dist/quill-emoji.js';
import { BlogService } from 'src/app/service/blog.service';
import { CategoryService } from 'src/app/service/category.service';
import { QUILL_TOOLBAR_SETTING } from 'src/app/utilities/quill_setting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  spinner: boolean = false;
  category: string[];
  modules = {};
  content: any;
  html: string;
  preview: boolean = false;
  create_blog_form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private category_service: CategoryService,
    private router: Router,
    private blog_service: BlogService
  ) {
    this.modules = QUILL_TOOLBAR_SETTING;
  }

  get_category() {
    this.spinner = true;
    this.category_service.get_category_type('Knowledge').subscribe(
      (res: any) => {
        this.category = res.data;
        this.spinner = false;
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

  validation() {
    this.create_blog_form = this.fb.group({
      heading: ['', Validators.required],
      category: ['', Validators.required],
      html: ['', Validators.required],
      published: [false, Validators.required],
    });
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

  live_demo() {
    this.preview = true;
    const form_data = this.create_blog_form.getRawValue();
    form_data.html = this.html;
    this.content = form_data;
  }

  create_blog() {
    this.spinner = true;
    const data = this.create_blog_form.getRawValue();
    data.user_id = localStorage.getItem('uid');
    data.like = 1;
    data.view = 1;
    data.last_read = new Date();
    this.blog_service.create_blog(data).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Blog Created',
        }).then(() => {
          this.spinner = false;
          this.create_blog_form.reset();
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
          this.router.navigate(['/main']);
        });
      }
    );
  }

  ngOnInit(): void {
    this.validation();
    this.get_category();
  }
}
