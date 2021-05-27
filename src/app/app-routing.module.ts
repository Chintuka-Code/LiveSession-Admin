import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { AuthGaurdGuard } from './gaurd/auth-gaurd.guard';
import { LoginGaurdGuard } from './gaurd/login-gaurd.guard';
import { RoleGaurdGuard } from './gaurd/role-gaurd.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGaurdGuard],
    loadChildren: () =>
      import('./Module/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'main',
    canActivate: [AuthGaurdGuard],
    loadChildren: () =>
      import('./Module/main/main.module').then((m) => m.MainModule),
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
