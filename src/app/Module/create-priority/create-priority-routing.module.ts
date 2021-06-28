import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePriorityComponent } from 'src/app/component/create-priority/create-priority.component';

const routes: Routes = [{ path: '', component: CreatePriorityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePriorityRoutingModule {}
