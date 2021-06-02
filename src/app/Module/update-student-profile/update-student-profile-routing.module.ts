import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateStudentProfileComponent } from '../../component/update-student-profile/update-student-profile.component';

const routes: Routes = [{ path: '', component: UpdateStudentProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateStudentProfileRoutingModule {}
