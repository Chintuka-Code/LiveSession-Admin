import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSubjectComponent } from 'src/app/component/view-subject/view-subject.component';

const routes: Routes = [{ path: '', component: ViewSubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSubjectRoutingModule {}
