import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramePageComponent } from './frame-page';

describe('FramePage', () => {
  let component: FramePageComponent;
  let fixture: ComponentFixture<FramePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FramePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FramePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
