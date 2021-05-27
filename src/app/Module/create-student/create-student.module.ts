import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateStudentRoutingModule } from './create-student-routing.module';
import { CreateStudentsComponent } from 'src/app/component/create-students/create-students.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [CreateStudentsComponent],
  imports: [
    CommonModule,
    CreateStudentRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CreateStudentModule {}
