import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateStudentProfileRoutingModule } from './update-student-profile-routing.module';
import { UpdateStudentProfileComponent } from '../../component/update-student-profile/update-student-profile.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [UpdateStudentProfileComponent],
  imports: [
    CommonModule,
    UpdateStudentProfileRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class UpdateStudentProfileModule {}
