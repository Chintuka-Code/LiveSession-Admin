import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBatchStudentRoutingModule } from './view-batch-student-routing.module';
import { ViewBatchStudentComponent } from '../../component/view-batch-student/view-batch-student.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [ViewBatchStudentComponent],
  imports: [
    CommonModule,
    ViewBatchStudentRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class ViewBatchStudentModule {}
