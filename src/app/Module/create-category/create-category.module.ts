import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './create-category-routing.module';
import { CreateCategoryComponent } from '../../component/create-category/create-category.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class CategoryModule {}
