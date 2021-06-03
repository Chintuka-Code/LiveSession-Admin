import { Component } from '@angular/core';
// import * as QuillNamespace from 'quill';
// let Quill: any = QuillNamespace;
// import ImageResize from 'quill-image-resize-module';

// Quill.register('modules/imageResize', ImageResize);

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LiveSessionChatAdmin';
}
