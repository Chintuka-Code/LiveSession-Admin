import { Component, OnInit } from '@angular/core';
import 'quill-emoji/dist/quill-emoji.js';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  spinner: boolean = false;
  category: string[];
  modules = {};
  content: any;

  constructor() {
    this.category = ['Data Science', 'Academics Team', 'Placements Team'];
    this.modules = {
      'emoji-shortname': true,
      'emoji-toolbar': true,

      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button

        ['link', 'image', 'video'], // link and image, video
        ['emoji'],
      ],
      imageResize: true,
    };
  }

  changedEditor(event) {
    this.content = event.html;
  }
  ngOnInit(): void {}
}
