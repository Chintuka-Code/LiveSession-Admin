import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectorRef,
} from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-live-blog-preview',
  templateUrl: './live-blog-preview.component.html',
  styleUrls: ['./live-blog-preview.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'initial',
        style({
          backgroundColor: 'rgba(0,0,0,.3)',
          opacity: 0.4,
        })
      ),
      state(
        'final',
        style({
          backgroundColor: 'rgba(0,0,0,.5)',
          opacity: 1,
        })
      ),
      transition('initial=>final', animate('500ms ease-out')),
      transition('final=>initial', animate('500ms ease-in')),
    ]),
  ],
})
export class LiveBlogPreviewComponent implements OnInit {
  @Input() content;
  @Output() closePreview = new EventEmitter();

  currentState = 'initial';

  date: number = Date.now();

  constructor(private cdref: ChangeDetectorRef) {}

  close() {
    this.closePreview.emit();
  }

  animate() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animate();
    this.cdref.detectChanges();
  }
}
