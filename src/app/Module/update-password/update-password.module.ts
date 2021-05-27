import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateProfileRoutingModule } from './update-password-routing.module';
import { UpdatePasswordComponent } from 'src/app/component/update-password/update-password.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    CommonModule,
    UpdateProfileRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class UpdateProfileModule {}
