import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerModeRoutingModule } from './trainer-mode-routing.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { TrainerModeComponent } from '../../component/trainer-mode/trainer-mode.component';

@NgModule({
  declarations: [TrainerModeComponent],
  imports: [
    CommonModule,
    TrainerModeRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class TrainerModeModule {}
