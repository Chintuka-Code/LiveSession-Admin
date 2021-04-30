import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserProfileRoutingModule } from './view-user-profile-routing.module';
import { ViewUserProfileComponent } from '../../component/view-user-profile/view-user-profile.component';

@NgModule({
  declarations: [ViewUserProfileComponent],
  imports: [CommonModule, ViewUserProfileRoutingModule],
})
export class ViewUserProfileModule {}
