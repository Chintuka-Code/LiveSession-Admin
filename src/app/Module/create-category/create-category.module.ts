import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './create-category-routing.module';
import { CreateCategoryComponent } from '../../component/create-category/create-category.component';

@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [CommonModule, CategoryRoutingModule],
})
export class CategoryModule {}
