import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCostsComponent } from './admin-costs.component';

describe('AdminCostsComponent', () => {
  let component: AdminCostsComponent;
  let fixture: ComponentFixture<AdminCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
