import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCourseRoutingModule } from './edit-course-routing.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { EditCourseComponent } from '../../component/edit-course/edit-course.component';

@NgModule({
  declarations: [EditCourseComponent],
  imports: [
    CommonModule,
    EditCourseRoutingModule,
    SharedUtilitiesModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
  ],
})
export class EditCourseModule {}
