import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewCategoryRoutingModule } from './view-category-routing.module';
import { ViewCategoryComponent } from 'src/app/component/view-category/view-category.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [ViewCategoryComponent],
  imports: [
    CommonModule,
    ViewCategoryRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class ViewCategoryModule {}
