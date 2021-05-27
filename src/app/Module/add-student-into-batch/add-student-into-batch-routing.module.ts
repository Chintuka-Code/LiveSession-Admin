import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentIntoBatchComponent } from '../../component/add-student-into-batch/add-student-into-batch.component';

const routes: Routes = [{ path: '', component: AddStudentIntoBatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStudentIntoBatchRoutingModule {}
