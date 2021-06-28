import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFieldsRoutingModule } from './custom-fields-routing.module';
import { CustomFieldsComponent } from '../../component/custom-fields/custom-fields.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [CustomFieldsComponent],
  imports: [
    CommonModule,
    CustomFieldsRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class CustomFieldsModule {}
