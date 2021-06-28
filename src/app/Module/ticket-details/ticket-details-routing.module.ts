import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailsComponent } from '../../component/ticket-details/ticket-details.component';

const routes: Routes = [{ path: '', component: TicketDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketDetailsRoutingModule {}
