import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCourseRoutingModule } from './view-course-routing.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { ViewCourseComponent } from '../../component/view-course/view-course.component';

@NgModule({
  declarations: [ViewCourseComponent],
  imports: [
    CommonModule,
    ViewCourseRoutingModule,
    SharedUtilitiesModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
  ],
})
export class ViewCourseModule {}
