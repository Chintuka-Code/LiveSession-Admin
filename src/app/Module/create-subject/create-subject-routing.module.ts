import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSubjectComponent } from '../../component/create-subject/create-subject.component';

const routes: Routes = [{ path: '', component: CreateSubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSubjectRoutingModule {}
