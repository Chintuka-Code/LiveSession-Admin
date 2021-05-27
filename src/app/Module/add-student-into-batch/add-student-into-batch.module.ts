import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStudentIntoBatchRoutingModule } from './add-student-into-batch-routing.module';
import { AddStudentIntoBatchComponent } from '../../component/add-student-into-batch/add-student-into-batch.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [AddStudentIntoBatchComponent],
  imports: [
    CommonModule,
    AddStudentIntoBatchRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class AddStudentIntoBatchModule {}
