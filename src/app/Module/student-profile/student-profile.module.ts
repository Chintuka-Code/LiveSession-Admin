import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentProfileRoutingModule } from './student-profile-routing.module';
import { StudentProfileComponent } from '../../component/student-profile/student-profile.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [StudentProfileComponent],
  imports: [
    CommonModule,
    StudentProfileRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class StudentProfileModule {}
