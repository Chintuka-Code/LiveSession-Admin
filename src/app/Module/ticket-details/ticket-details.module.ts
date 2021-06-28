import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketDetailsRoutingModule } from './ticket-details-routing.module';
import { TicketDetailsComponent } from '../../component/ticket-details/ticket-details.component';

@NgModule({
  declarations: [TicketDetailsComponent],
  imports: [CommonModule, TicketDetailsRoutingModule],
})
export class TicketDetailsModule {}
