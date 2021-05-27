import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCourseComponent } from '../../component/create-course/create-course.component';

const routes: Routes = [{ path: '', component: CreateCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCourseRoutingModule {}
