import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewBatchStudentComponent } from '../../component/view-batch-student/view-batch-student.component';

const routes: Routes = [{ path: '', component: ViewBatchStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBatchStudentRoutingModule {}
