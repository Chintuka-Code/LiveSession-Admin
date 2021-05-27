import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentsComponent } from 'src/app/component/create-students/create-students.component';
const routes: Routes = [{ path: '', component: CreateStudentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateStudentRoutingModule {}
