import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndAllChatsComponent } from 'src/app/component/end-all-chats/end-all-chats.component';

const routes: Routes = [{ path: '', component: EndAllChatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndAllChatsRoutingModule {}
