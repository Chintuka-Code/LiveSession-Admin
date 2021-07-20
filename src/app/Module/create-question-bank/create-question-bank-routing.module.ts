import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuestionBankComponent } from 'src/app/component/create-question-bank/create-question-bank.component';

const routes: Routes = [{ path: '', component: CreateQuestionBankComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuestionBankRoutingModule {}
