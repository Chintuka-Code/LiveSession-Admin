import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndAllChatsRoutingModule } from './end-all-chats-routing.module';
import { EndAllChatsComponent } from 'src/app/component/end-all-chats/end-all-chats.component';
import { PrimengModule } from 'src/app/SharedModule/primeng/primeng.module';
import { SharedUtilitiesModule } from 'src/app/SharedModule/shared-utilities/shared-utilities.module';

@NgModule({
  declarations: [EndAllChatsComponent],
  imports: [
    CommonModule,
    EndAllChatsRoutingModule,
    PrimengModule,
    SharedUtilitiesModule,
  ],
})
export class EndAllChatsModule {}
