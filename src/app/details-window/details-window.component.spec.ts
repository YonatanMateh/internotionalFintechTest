import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWindowComponent } from './details-window.component';

describe('DetailsWindowComponent', () => {
  let component: DetailsWindowComponent;
  let fixture: ComponentFixture<DetailsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
