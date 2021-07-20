import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQuestionRoutingModule } from './create-question-routing.module';
import { CreateQuestionComponent } from 'src/app/component/create-question/create-question.component';

@NgModule({
  declarations: [CreateQuestionComponent],
  imports: [CommonModule, CreateQuestionRoutingModule],
})
export class CreateQuestionModule {}
