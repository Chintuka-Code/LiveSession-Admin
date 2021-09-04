import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from 'src/app/component/log/log.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class LogModule {}
