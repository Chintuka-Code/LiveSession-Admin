import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeBatchComponent } from 'src/app/component/change-batch/change-batch.component';

const routes: Routes = [{ path: '', component: ChangeBatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeBatchRoutingModule {}
