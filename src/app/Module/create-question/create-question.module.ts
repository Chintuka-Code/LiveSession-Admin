import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQuestionRoutingModule } from './create-question-routing.module';
import { CreateQuestionComponent } from 'src/app/component/create-question/create-question.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { AddFromExistingQuestionComponent } from '../../component/add-from-existing-question/add-from-existing-question.component';

@NgModule({
  declarations: [CreateQuestionComponent, AddFromExistingQuestionComponent],
  imports: [
    CommonModule,
    CreateQuestionRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CreateQuestionModule {}
