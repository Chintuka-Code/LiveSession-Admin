import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainerModeComponent } from '../../component/trainer-mode/trainer-mode.component';

const routes: Routes = [{ path: '', component: TrainerModeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerModeRoutingModule {}
