import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQuestionBankRoutingModule } from './create-question-bank-routing.module';
import { CreateQuestionBankComponent } from 'src/app/component/create-question-bank/create-question-bank.component';

@NgModule({
  declarations: [CreateQuestionBankComponent],
  imports: [CommonModule, CreateQuestionBankRoutingModule],
})
export class CreateQuestionBankModule {}
