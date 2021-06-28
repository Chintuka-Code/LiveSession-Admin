import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTicketsRoutingModule } from './my-tickets-routing.module';
import { MyTicketsComponent } from '../../component/my-tickets/my-tickets.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [MyTicketsComponent],
  imports: [
    CommonModule,
    MyTicketsRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class MyTicketsModule {}
