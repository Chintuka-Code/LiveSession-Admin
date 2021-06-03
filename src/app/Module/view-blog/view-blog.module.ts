import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBlogRoutingModule } from './view-blog-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { ViewBlogComponent } from '../../component/view-blog/view-blog.component';

@NgModule({
  declarations: [ViewBlogComponent],
  imports: [
    CommonModule,
    ViewBlogRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewBlogModule {}
