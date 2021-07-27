import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateExamRoutingModule } from './create-exam-routing.module';
import { CreateExamComponent } from '../../component/create-exam/create-exam.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import {ExamFormComponent} from '../../component/exam-steps/exam-form/exam-form.component'
import {ExamInstructionComponent} from '../../component/exam-steps/exam-instruction/exam-instruction.component'
import {AttemptsComponent} from '../../component/exam-steps/attempts/attempts.component'
import {BrowserSettingComponent} from '../../component/exam-steps/browser-setting/browser-setting.component'


@NgModule({
  declarations: [CreateExamComponent, ExamFormComponent, ExamInstructionComponent, AttemptsComponent, BrowserSettingComponent ],
  imports: [
    CommonModule,
    CreateExamRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ]
})
export class CreateExamModule { }
