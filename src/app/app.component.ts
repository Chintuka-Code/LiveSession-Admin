import { Component } from '@angular/core';
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
import { LiveSessionChatService } from './service/live-session-chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LiveSessionChatAdmin';

  constructor(private live_session_chat_service: LiveSessionChatService) {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.live_session_chat_service.disconnect();
  }
}
