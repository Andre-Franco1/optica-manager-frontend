import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameFormPageComponent } from './frame-form-page';

describe('FrameFormPage', () => {
  let component: FrameFormPageComponent;
  let fixture: ComponentFixture<FrameFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
