import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBlogRoutingModule } from './create-blog-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { CreateBlogComponent } from '../../component/create-blog/create-blog.component';

@NgModule({
  declarations: [CreateBlogComponent],
  imports: [
    CommonModule,
    CreateBlogRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CreateBlogModule {}
