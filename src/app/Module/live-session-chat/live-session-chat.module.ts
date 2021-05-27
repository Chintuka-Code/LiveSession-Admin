import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveSessionChatRoutingModule } from './live-session-chat-routing.module';
import { LiveSessionChatComponent } from '../../component/live-session-chat/live-session-chat.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LiveSessionChatComponent],
  imports: [
    CommonModule,
    LiveSessionChatRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
    HttpClientModule,
  ],
})
export class LiveSessionChatModule {}
