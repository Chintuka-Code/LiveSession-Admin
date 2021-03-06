import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuestionComponent } from 'src/app/component/create-question/create-question.component';

const routes: Routes = [{ path: '', component: CreateQuestionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQuestionRoutingModule {}
