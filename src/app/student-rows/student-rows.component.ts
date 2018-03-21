import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: '[student-rows]',
  templateUrl: './student-rows.component.html',
  styleUrls: ['./student-rows.component.css']
})
export class StudentRowsComponent implements OnInit {
 @Input() p: number = 1;
  students: any[];
  currentStudent: any;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    console.log(this.studentsService.getAllStudents());
    this.students = this.studentsService.getAllStudents();
    this.studentsService.currentStudent.subscribe(student => this.currentStudent = student)
  }
  studentSelected(student, grade, i) {
    console.log(i);
    console.log(student.Grades[i]);
    let obj = {
      student: student,
      gradeIndex: i
    }
    this.studentsService.changeStudent(obj);
  }
}
