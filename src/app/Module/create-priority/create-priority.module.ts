import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePriorityRoutingModule } from './create-priority-routing.module';
import { CreatePriorityComponent } from 'src/app/component/create-priority/create-priority.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [CreatePriorityComponent],
  imports: [
    CommonModule,
    CreatePriorityRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class CreatePriorityModule {}
