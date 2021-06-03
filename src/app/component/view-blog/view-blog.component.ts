import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  spinner: boolean = false;
  blog_type_disabled: boolean = false;
  constructor() {}

  get_updated_blog() {}

  ngOnInit(): void {}
}
