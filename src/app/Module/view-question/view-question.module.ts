import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionRoutingModule } from './view-question-routing.module';
import { ViewQuestionComponent } from 'src/app/component/view-question/view-question.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ViewQuestionComponent],
  imports: [
    CommonModule,
    ViewQuestionRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewQuestionModule {}
