import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { CategoryComponent } from '../../component/project/category/category.component';
import { ProjectComponent } from '../../component/project/project/project.component';

import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { CreateCategoryComponent } from '../../component/project/create-category/create-category.component';
import { CreateProjectComponent } from '../../component/project/create-project/create-project.component';
import { AssignProjectComponent } from '../../component/project/assign-project/assign-project.component';
import { CreateAssignProjectComponent } from '../../component/project/create-assign-project/create-assign-project.component';


@NgModule({
  declarations: [ProjectComponent, CategoryComponent,CreateCategoryComponent, CreateProjectComponent, AssignProjectComponent, CreateAssignProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedUtilitiesModule,
    PrimengModule,
  ]
})
export class ProjectModule { }
