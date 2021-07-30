import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveSessionMultiComponent } from 'src/app/component/live-session-multi/live-session-multi.component';

const routes: Routes = [{ path: '', component: LiveSessionMultiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveSessionMultiRoutingModule {}
