import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBatchComponent } from '../../component/edit-batch/edit-batch.component';

const routes: Routes = [{ path: '', component: EditBatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBatchRoutingModule {}
