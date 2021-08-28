import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from '../../component/project/category/category.component';
import { ProjectComponent } from '../../component/project/project/project.component';
import { CreateCategoryComponent } from '../../component/project/create-category/create-category.component';
import { CreateProjectComponent } from '../../component/project/create-project/create-project.component';

const routes: Routes = [
  { path: '', component: ProjectComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'create-project', component: CreateProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
