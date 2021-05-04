import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBatchRoutingModule } from './edit-batch-routing.module';
import { EditBatchComponent } from '../../component/edit-batch/edit-batch.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [EditBatchComponent],
  imports: [
    CommonModule,
    EditBatchRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class EditBatchModule {}
