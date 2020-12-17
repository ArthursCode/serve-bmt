import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCostsComponent } from './daily-costs.component';

describe('DailyCostsComponent', () => {
  let component: DailyCostsComponent;
  let fixture: ComponentFixture<DailyCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
