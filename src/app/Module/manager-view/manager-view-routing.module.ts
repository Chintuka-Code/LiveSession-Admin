import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerViewComponent } from 'src/app/component/manager-view/manager-view.component';

const routes: Routes = [{ path: '', component: ManagerViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerViewRoutingModule {}
