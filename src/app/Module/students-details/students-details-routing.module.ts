import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsDetailsComponent } from 'src/app/component/students-details/students-details.component';

const routes: Routes = [{ path: '', component: StudentsDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsDetailsRoutingModule {}
