import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveSessionChatComponent } from '../../component/live-session-chat/live-session-chat.component';

const routes: Routes = [{ path: '', component: LiveSessionChatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveSessionChatRoutingModule {}
