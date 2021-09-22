import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditQuestionBankRoutingModule } from './edit-question-bank-routing.module';
import { EditQuestionBankComponent } from 'src/app/component/edit-question-bank/edit-question-bank.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [EditQuestionBankComponent],
  imports: [
    CommonModule,
    EditQuestionBankRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class EditQuestionBankModule {}
