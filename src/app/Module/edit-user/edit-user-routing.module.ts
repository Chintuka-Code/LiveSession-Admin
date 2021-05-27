import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from '../../component/edit-user/edit-user.component';

const routes: Routes = [{ path: '', component: EditUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserRoutingModule {}
