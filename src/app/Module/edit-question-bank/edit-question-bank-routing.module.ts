import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditQuestionBankComponent } from 'src/app/component/edit-question-bank/edit-question-bank.component';

const routes: Routes = [{ path: '', component: EditQuestionBankComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditQuestionBankRoutingModule {}
