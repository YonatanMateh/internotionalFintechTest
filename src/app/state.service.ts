import { Injectable } from '@angular/core';
import { FilterObj } from './models/FilterObj';
import { Student } from './models/student';
@Injectable()
export class StateService {
  currentFilter: FilterObj;
  currentStudent: Student;
  pageNumber: number;
  selectedStudents: string[] = [];
  selectedCourses: string[] = [];
  constructor() { }


}
