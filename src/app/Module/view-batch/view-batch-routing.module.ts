import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewBatchComponent } from '../../component/view-batch/view-batch.component';

const routes: Routes = [{ path: '', component: ViewBatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBatchRoutingModule {}
