import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHistoryTablePageComponent } from './sales-history-table-page';

describe('SalesHistoryTablePage', () => {
  let component: SalesHistoryTablePageComponent;
  let fixture: ComponentFixture<SalesHistoryTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesHistoryTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesHistoryTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
