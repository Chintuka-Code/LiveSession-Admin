import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewBatchRoutingModule } from './view-batch-routing.module';
import { ViewBatchComponent } from '../../component/view-batch/view-batch.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ViewBatchComponent],
  imports: [
    CommonModule,
    ViewBatchRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewBatchModule {}
