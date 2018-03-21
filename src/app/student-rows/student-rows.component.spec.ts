import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRowsComponent } from './student-rows.component';

describe('StudentRowsComponent', () => {
  let component: StudentRowsComponent;
  let fixture: ComponentFixture<StudentRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
