import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateExamComponent } from '../../component/create-exam/create-exam.component';

const routes: Routes = [{ path: '', component: CreateExamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateExamRoutingModule { }
