import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPriorityRoutingModule } from './view-priority-routing.module';
import { ViewPriorityComponent } from '../../component/view-priority/view-priority.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ViewPriorityComponent],
  imports: [
    CommonModule,
    ViewPriorityRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewPriorityModule {}
