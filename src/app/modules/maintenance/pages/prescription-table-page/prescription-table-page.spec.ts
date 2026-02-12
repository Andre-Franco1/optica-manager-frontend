import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionTablePageComponent } from './prescription-table-page';

describe('PrescriptionTablePage', () => {
  let component: PrescriptionTablePageComponent;
  let fixture: ComponentFixture<PrescriptionTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrescriptionTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrescriptionTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
