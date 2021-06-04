import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBlogRoutingModule } from './create-blog-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { CreateBlogComponent } from '../../component/create-blog/create-blog.component';
import { LiveBlogPreviewComponent } from '../../component/live-blog-preview/live-blog-preview.component';

@NgModule({
  declarations: [CreateBlogComponent, LiveBlogPreviewComponent],
  imports: [
    CommonModule,
    CreateBlogRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CreateBlogModule {}
