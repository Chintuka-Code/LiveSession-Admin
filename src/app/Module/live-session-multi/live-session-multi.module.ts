import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveSessionMultiRoutingModule } from './live-session-multi-routing.module';
import { LiveSessionMultiComponent } from 'src/app/component/live-session-multi/live-session-multi.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [LiveSessionMultiComponent],
  imports: [
    CommonModule,
    LiveSessionMultiRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class LiveSessionMultiModule {}
