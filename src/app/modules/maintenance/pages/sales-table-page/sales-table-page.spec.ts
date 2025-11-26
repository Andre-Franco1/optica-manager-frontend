import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTablePageComponent } from './sales-table-page';

describe('SaleTablePage', () => {
  let component: SalesTablePageComponent;
  let fixture: ComponentFixture<SalesTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
