import { Injectable } from '@angular/core';
import { FilterObj } from './models/FilterObj';
import { Student } from './models/student';
/*
this service saves the current data when leaving one component to another
*/
@Injectable()

export class StateService {
  currentFilter: FilterObj;
  currentStudent: Student;
  pageNumber: number;
  selectedStudents: string[] = [];
  selectedCourses: string[] = [];

  constructor() { }
}
