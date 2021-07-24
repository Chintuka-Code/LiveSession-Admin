import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateExamRoutingModule } from './create-exam-routing.module';
import { CreateExamComponent } from '../../component/create-exam/create-exam.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [CreateExamComponent],
  imports: [
    CommonModule,
    CreateExamRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ]
})
export class CreateExamModule { }
