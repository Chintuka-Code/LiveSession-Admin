import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBlogComponent } from '../../component/edit-blog/edit-blog.component';

const routes: Routes = [{ path: '', component: EditBlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBlogRoutingModule {}
