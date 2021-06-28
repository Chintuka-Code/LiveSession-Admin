import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTicketComponent } from '../../component/view-ticket/view-ticket.component';

const routes: Routes = [{ path: '', component: ViewTicketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTicketRoutingModule {}
