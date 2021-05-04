import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBatchComponent } from '../../component/create-batch/create-batch.component';

const routes: Routes = [{ path: '', component: CreateBatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBatchRoutingModule {}
