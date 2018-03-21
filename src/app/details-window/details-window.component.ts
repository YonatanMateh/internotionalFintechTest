import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';
import { Grade } from '../models/Grade';
@Component({
  selector: 'details-window',
  templateUrl: './details-window.component.html',
  styleUrls: ['./details-window.component.css']
})
export class DetailsWindowComponent implements OnInit {
  student: Student;
  currentStudent: any;
  grade: Grade;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.student = new Student();
    this.studentsService.currentStudent.subscribe(student => {
      if (student) {
        this.currentStudent = JSON.parse(JSON.stringify(student.student))
        this.grade = this.currentStudent.Grades[student.gradeIndex]
      }
    });
  }

  saveStudent() {
    this.studentsService.updateStudent(this.currentStudent);
  }

  cancelUpdating() {
    this.studentsService.changeStudent(null);
  }


}
