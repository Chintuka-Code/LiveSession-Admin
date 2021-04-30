import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../../component/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'create-user',
        data: { role: 'U01' },
        loadChildren: () =>
          import('../create-user/create-user.module').then(
            (m) => m.CreateUserModule
          ),
      },
      {
        path: 'user-details/:user_type',
        loadChildren: () =>
          import('../user-details/user-details.module').then(
            (m) => m.UserDetailsModule
          ),
      },
      {
        path: 'students-details/:user_type',
        loadChildren: () =>
          import('../students-details/students-details.module').then(
            (m) => m.StudentsDetailsModule
          ),
      },
      {
        path: 'edit-user',
        loadChildren: () =>
          import('../edit-user/edit-user.module').then((m) => m.EditUserModule),
      },
      {
        path: 'view-user-profile',
        loadChildren: () =>
          import('../view-user-profile/view-user-profile.module').then(
            (m) => m.ViewUserProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
