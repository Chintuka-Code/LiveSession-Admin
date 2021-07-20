import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewQuestionBankRoutingModule } from './view-question-bank-routing.module';
import { ViewQuestionBankComponent } from 'src/app/component/view-question-bank/view-question-bank.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ViewQuestionBankComponent],
  imports: [
    CommonModule,
    ViewQuestionBankRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewQuestionBankModule {}
