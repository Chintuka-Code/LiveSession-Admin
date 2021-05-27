import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignBatchToAdminComponent } from '../../component/assign-batch-to-admin/assign-batch-to-admin.component';

const routes: Routes = [{ path: '', component: AssignBatchToAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignBatchToAdminRoutingModule {}
