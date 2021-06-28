import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewTicketRoutingModule } from './view-ticket-routing.module';
import { ViewTicketComponent } from '../../component/view-ticket/view-ticket.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ViewTicketComponent],
  imports: [
    CommonModule,
    ViewTicketRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewTicketModule {}
