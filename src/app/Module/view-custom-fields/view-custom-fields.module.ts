import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCustomFieldsRoutingModule } from './view-custom-fields-routing.module';
import { ViewCustomFieldsComponent } from '../../component/view-custom-fields/view-custom-fields.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [ViewCustomFieldsComponent],
  imports: [
    CommonModule,
    ViewCustomFieldsRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class ViewCustomFieldsModule {}
