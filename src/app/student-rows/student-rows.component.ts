import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service';
import { FilterObj } from '../models/FilterObj';
import { Student } from '../models/student';
import { StateService } from '../state.service';

@Component({
  selector: '[student-rows]',
  templateUrl: './student-rows.component.html',
  styleUrls: ['./student-rows.component.css']
})
export class StudentRowsComponent implements OnInit {
 @Input() p: number;
  students: Student[];
  currentStudent: Student;
  filterObj: FilterObj;
  constructor(private studentsService: StudentsService,
  private stateService: StateService) { }

  ngOnInit() {
    // console.log(this.studentsService.getAllStudents());
    console.log('state ', this.stateService);
    this.students = this.studentsService.getAllStudents();
    this.studentsService.currentStudent.subscribe(student => this.currentStudent = student);
    this.studentsService.currentFilterObj.subscribe(filterObj => this.filterObj = filterObj);
    this.getSavedState();
  }
  studentSelected(student) {
    // let obj = {
    //   student: student,
    //   index: index
    // }
    console.log('change student ',student);
    this.studentsService.changeStudent(student);
  }

  ngOnDestroy() {
  
    this.stateService.currentFilter = this.filterObj;
    this.stateService.currentStudent = this.currentStudent;
    this.stateService.pageNumber = this.p;
    console.log('state end ', this.stateService);
  }

  getSavedState() {
    this.currentStudent = this.stateService.currentStudent || null;
    this.filterObj = this.stateService.currentFilter || null;
    this.p = this.stateService.pageNumber || null;
  }
}
