import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';

@Component({
  selector: 'details-window',
  templateUrl: './details-window.component.html',
  styleUrls: ['./details-window.component.css']
})
export class DetailsWindowComponent implements OnInit {
  // student: Student;
  currentStudent: Student;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    // student = new Student();
    this.studentsService.currentStudent.subscribe(student => {
      if (student) {
        this.currentStudent = JSON.parse(JSON.stringify(student))
        // this.grade = this.currentStudent.Grades[student.gradeIndex]
      }
    });
  }

  saveStudent() {
    console.log('object');
    this.studentsService.updateStudent(this.currentStudent);
  }

  cancelUpdating() {
    this.studentsService.changeStudent(null);
  }


}
