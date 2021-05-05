import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignBatchToAdminRoutingModule } from './assign-batch-to-admin-routing.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { AssignBatchToAdminComponent } from '../../component/assign-batch-to-admin/assign-batch-to-admin.component';

@NgModule({
  declarations: [AssignBatchToAdminComponent],
  imports: [
    CommonModule,
    AssignBatchToAdminRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class AssignBatchToAdminModule {}
