import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTablePageComponent } from './clients-table-page';

describe('ClientsTablePage', () => {
  let component: ClientsTablePageComponent;
  let fixture: ComponentFixture<ClientsTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
