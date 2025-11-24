import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensPageComponent } from './lens-page';

describe('LensPage', () => {
  let component: LensPageComponent;
  let fixture: ComponentFixture<LensPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LensPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LensPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
