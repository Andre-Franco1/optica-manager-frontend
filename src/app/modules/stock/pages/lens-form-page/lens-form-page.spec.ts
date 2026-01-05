import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensFormPage } from './lens-form-page';

describe('LensFormPage', () => {
  let component: LensFormPage;
  let fixture: ComponentFixture<LensFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LensFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LensFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
