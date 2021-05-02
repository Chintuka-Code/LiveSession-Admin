import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateCourseRoutingModule } from './create-course-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCourseComponent } from '../../component/create-course/create-course.component';

@NgModule({
  declarations: [CreateCourseComponent],
  imports: [
    CommonModule,
    CreateCourseRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CreateCourseModule {}
