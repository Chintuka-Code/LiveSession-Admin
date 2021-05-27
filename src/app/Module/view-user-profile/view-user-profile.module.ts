import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserProfileRoutingModule } from './view-user-profile-routing.module';
import { ViewUserProfileComponent } from '../../component/view-user-profile/view-user-profile.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ViewUserProfileComponent],
  imports: [
    CommonModule,
    ViewUserProfileRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ViewUserProfileModule {}
