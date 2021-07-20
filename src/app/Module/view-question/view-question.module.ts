import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionRoutingModule } from './view-question-routing.module';
import { ViewQuestionComponent } from 'src/app/component/view-question/view-question.component';

@NgModule({
  declarations: [ViewQuestionComponent],
  imports: [CommonModule, ViewQuestionRoutingModule],
})
export class ViewQuestionModule {}
