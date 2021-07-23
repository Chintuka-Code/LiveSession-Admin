import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExamComponent } from '../../component/view-exam/view-exam.component';

const routes: Routes = [{ path: '', component: ViewExamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExamRoutingModule { }
