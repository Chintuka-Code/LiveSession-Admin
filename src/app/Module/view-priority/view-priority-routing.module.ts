import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPriorityComponent } from 'src/app/component/view-priority/view-priority.component';

const routes: Routes = [{ path: '', component: ViewPriorityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPriorityRoutingModule {}
