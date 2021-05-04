import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBatchRoutingModule } from './create-batch-routing.module';
import { CreateBatchComponent } from '../../component/create-batch/create-batch.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [CreateBatchComponent],
  imports: [
    CommonModule,
    CreateBatchRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CreateBatchModule {}
