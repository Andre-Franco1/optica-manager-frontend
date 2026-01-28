import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensTablePageComponent } from './lens-table-page';

describe('LensTablePage', () => {
  let component: LensTablePageComponent;
  let fixture: ComponentFixture<LensTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LensTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LensTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
