import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameTablePageComponent } from './frame-table-page';

describe('FrameTablePage', () => {
  let component: FrameTablePageComponent;
  let fixture: ComponentFixture<FrameTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
