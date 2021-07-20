import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionBankRoutingModule } from './view-question-bank-routing.module';
import { ViewQuestionBankComponent } from 'src/app/component/view-question-bank/view-question-bank.component';

@NgModule({
  declarations: [ViewQuestionBankComponent],
  imports: [CommonModule, ViewQuestionBankRoutingModule],
})
export class ViewQuestionBankModule {}
