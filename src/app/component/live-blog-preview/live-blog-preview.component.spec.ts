import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveBlogPreviewComponent } from './live-blog-preview.component';

describe('LiveBlogPreviewComponent', () => {
  let component: LiveBlogPreviewComponent;
  let fixture: ComponentFixture<LiveBlogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveBlogPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveBlogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
