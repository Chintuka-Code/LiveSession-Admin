import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCategoryRoutingModule } from './edit-category-routing.module';
import { EditCategoryComponent } from 'src/app/component/edit-category/edit-category.component';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';

@NgModule({
  declarations: [EditCategoryComponent],
  imports: [
    CommonModule,
    EditCategoryRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ],
})
export class EditCategoryModule {}
