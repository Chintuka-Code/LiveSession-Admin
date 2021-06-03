import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBlogRoutingModule } from './edit-blog-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { EditBlogComponent } from '../../component/edit-blog/edit-blog.component';

@NgModule({
  declarations: [EditBlogComponent],
  imports: [
    CommonModule,
    EditBlogRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class EditBlogModule {}
