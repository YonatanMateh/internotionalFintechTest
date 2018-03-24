import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';

@Component({
  selector: 'details-window',
  templateUrl: './details-window.component.html',
  styleUrls: ['./details-window.component.css']
})
export class DetailsWindowComponent implements OnInit {

  currentStudent: Student;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.currentStudent.subscribe(student => {
      if (student) {
        this.currentStudent = JSON.parse(JSON.stringify(student))
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
