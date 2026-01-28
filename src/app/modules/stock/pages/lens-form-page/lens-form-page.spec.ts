import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensFormPageComponent } from './lens-form-page';

describe('LensFormPage', () => {
  let component: LensFormPageComponent;
  let fixture: ComponentFixture<LensFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LensFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LensFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
