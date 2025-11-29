import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleFormPageComponent } from './sale-form-page';

describe('SaleFormPage', () => {
  let component: SaleFormPageComponent;
  let fixture: ComponentFixture<SaleFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
