import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageWindowComponent } from './average-window.component';

describe('AverageWindowComponent', () => {
  let component: AverageWindowComponent;
  let fixture: ComponentFixture<AverageWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
