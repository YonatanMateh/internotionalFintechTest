import { Component, OnInit, Input } from '@angular/core';

import { StudentsService } from '../students.service';
import { StateService } from '../state.service';

import { FilterObj } from '../models/FilterObj';
import { Student } from '../models/student';
/*
this component contains the table data rows of all students
*/
@Component({
  selector: '[student-rows]',
  templateUrl: './student-rows.component.html',
  styleUrls: ['./student-rows.component.css']
})
export class StudentRowsComponent implements OnInit {
  @Input() p: number; //page number
  private students: Student[];
  private currentStudent: Student; //the chosen student
  private filterObj: FilterObj;

  constructor(private studentsService: StudentsService,
    private stateService: StateService) { }

  ngOnInit() {
    this.students = this.studentsService.getAllStudents();
    this.studentsService.currentStudent.subscribe(student => this.currentStudent = student);
    this.studentsService.currentFilterObj.subscribe(filterObj => this.filterObj = filterObj);
    this.getSavedState();
  }
  
  ngOnDestroy() {
    this.stateService.currentFilter = this.filterObj;
    this.stateService.currentStudent = this.currentStudent;
    this.stateService.pageNumber = this.p;
  }

  //actions
  private studentSelected(student) {
    this.studentsService.changeStudent(student);
  }

  //methods
  private getSavedState() { 
    this.currentStudent = this.stateService.currentStudent || null;
    this.filterObj = this.stateService.currentFilter || null;
    this.p = this.stateService.pageNumber || null;
  }
}
