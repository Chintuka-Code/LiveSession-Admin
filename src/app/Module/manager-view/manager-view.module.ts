import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerViewRoutingModule } from './manager-view-routing.module';
import { ManagerViewComponent } from 'src/app/component/manager-view/manager-view.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [ManagerViewComponent],
  imports: [
    CommonModule,
    ManagerViewRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class ManagerViewModule {}
