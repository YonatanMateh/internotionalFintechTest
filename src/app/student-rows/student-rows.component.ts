import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service';
import { FilterObj } from '../models/FilterObj';
import { Student } from '../models/student';
@Component({
  selector: '[student-rows]',
  templateUrl: './student-rows.component.html',
  styleUrls: ['./student-rows.component.css']
})
export class StudentRowsComponent implements OnInit {
 @Input() p: number = 1;
  students: Student[];
  currentStudent: Student;
  filterObj: FilterObj;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    // console.log(this.studentsService.getAllStudents());
    this.students = this.studentsService.getAllStudents();
    this.studentsService.currentStudent.subscribe(student => this.currentStudent = student);
    this.studentsService.currentFilterObj.subscribe(filterObj => this.filterObj = filterObj);
  }
  studentSelected(student) {
    // let obj = {
    //   student: student,
    //   index: index
    // }
    this.studentsService.changeStudent(student);
  }
}
