import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewCategoryComponent implements OnInit {
  spinner: boolean = false;
  category_type_disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
