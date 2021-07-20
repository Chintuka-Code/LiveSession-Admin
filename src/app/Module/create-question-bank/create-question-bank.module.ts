import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQuestionBankRoutingModule } from './create-question-bank-routing.module';
import { CreateQuestionBankComponent } from 'src/app/component/create-question-bank/create-question-bank.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [CreateQuestionBankComponent],
  imports: [
    CommonModule,
    CreateQuestionBankRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CreateQuestionBankModule {}
