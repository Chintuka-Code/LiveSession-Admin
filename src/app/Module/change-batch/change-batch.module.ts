import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeBatchRoutingModule } from './change-batch-routing.module';
import { ChangeBatchComponent } from '../../component/change-batch/change-batch.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ChangeBatchComponent],
  imports: [
    CommonModule,
    ChangeBatchRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ChangeBatchModule {}
