import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewExamRoutingModule } from './view-exam-routing.module';
import { ViewExamComponent } from '../../component/view-exam/view-exam.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { SubmissionComponent } from '../../component/submission/submission.component';



@NgModule({
  declarations: [ViewExamComponent, SubmissionComponent],
  imports: [
    CommonModule,
    ViewExamRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ]
})
export class ViewExamModule { }
