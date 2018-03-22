import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSelectionComponent } from './statistics-selection.component';

describe('StatisticsSelectionComponent', () => {
  let component: StatisticsSelectionComponent;
  let fixture: ComponentFixture<StatisticsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
