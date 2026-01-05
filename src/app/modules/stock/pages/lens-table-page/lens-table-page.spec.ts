import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LensTablePage } from './lens-table-page';

describe('LensTablePage', () => {
  let component: LensTablePage;
  let fixture: ComponentFixture<LensTablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LensTablePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LensTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
