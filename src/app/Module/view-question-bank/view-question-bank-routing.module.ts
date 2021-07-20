import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewQuestionBankComponent } from 'src/app/component/view-question-bank/view-question-bank.component';

const routes: Routes = [{ path: '', component: ViewQuestionBankComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQuestionBankRoutingModule {}
