import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewQuestionComponent } from 'src/app/component/view-question/view-question.component';

const routes: Routes = [{ path: '', component: ViewQuestionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQuestionRoutingModule {}
