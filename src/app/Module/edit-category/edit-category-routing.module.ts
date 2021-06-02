import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCategoryComponent } from 'src/app/component/edit-category/edit-category.component';

const routes: Routes = [{ path: '', component: EditCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCategoryRoutingModule {}
