import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsDetailsRoutingModule } from './students-details-routing.module';
import { StudentsDetailsComponent } from '../../component/students-details/students-details.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [StudentsDetailsComponent],
  imports: [
    CommonModule,
    StudentsDetailsRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class StudentsDetailsModule {}
