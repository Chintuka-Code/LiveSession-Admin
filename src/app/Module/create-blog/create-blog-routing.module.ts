import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBlogComponent } from '../../component/create-blog/create-blog.component';

const routes: Routes = [{ path: '', component: CreateBlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBlogRoutingModule {}
