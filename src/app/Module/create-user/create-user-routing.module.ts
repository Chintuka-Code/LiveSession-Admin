import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from 'src/app/component/create-user/create-user.component';
import { RoleGaurdGuard } from 'src/app/gaurd/role-gaurd.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserRoutingModule {}
