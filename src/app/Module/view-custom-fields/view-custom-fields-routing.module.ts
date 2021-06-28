import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCustomFieldsComponent } from '../../component/view-custom-fields/view-custom-fields.component';

const routes: Routes = [{ path: '', component: ViewCustomFieldsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCustomFieldsRoutingModule {}
