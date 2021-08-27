import { Component, HostListener } from '@angular/core';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
import { LiveSessionChatService } from './service/live-session-chat.service';
import { ConnectionService } from 'ng-connection-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  title = 'LiveSessionChatAdmin';
  status: string;

  constructor(
    private live_session_chat_service: LiveSessionChatService,
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe((isConnected) => {
      const body: HTMLBodyElement = document.querySelector('body');
      if (isConnected) {
        this.status = 'ONLINE';
        this.live_session_chat_service.user_status({
          user_id: localStorage.getItem('uid'),
          status: 'Online',
        });
        body.style.overflow = 'auto';
      } else {
        this.status = 'OFFLINE';
        this.live_session_chat_service.user_status({
          user_id: localStorage.getItem('uid'),
          status: 'Offline',
        });
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        body.style.overflow = 'hidden';
      }
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.live_session_chat_service.join_room({
      room_id: localStorage.getItem('uid'),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.live_session_chat_service.disconnect();
  }
}
