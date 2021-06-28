import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyTicketsComponent } from '../../component/my-tickets/my-tickets.component';
const routes: Routes = [{ path: '', component: MyTicketsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTicketsRoutingModule {}
