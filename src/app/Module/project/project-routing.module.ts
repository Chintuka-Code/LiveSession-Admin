import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from '../../component/project/category/category.component';
import { ProjectComponent } from '../../component/project/project/project.component';
import { CreateCategoryComponent } from '../../component/project/create-category/create-category.component';
import { CreateProjectComponent } from '../../component/project/create-project/create-project.component';
import { AssignProjectComponent } from '../../component/project/assign-project/assign-project.component';
import { CreateAssignProjectComponent } from '../../component/project/create-assign-project/create-assign-project.component';


const routes: Routes = [
  { path: '', component: ProjectComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'assign-project', component: AssignProjectComponent },
  { path: 'create-assign-project', component: CreateAssignProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
