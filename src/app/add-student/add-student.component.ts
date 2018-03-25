import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UUID } from 'angular2-uuid';

import { StudentsService } from '../students.service';
import { EditButtonsComponent } from '../edit-buttons/edit-buttons.component';
import { Student } from '../models/student';

/*
  this component is for adding new student
*/
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  private student: Student;

  constructor(public dialogRef: MatDialogRef<EditButtonsComponent>,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.student = new Student();
  }

  //actions
  private saveStudent(): void {
    if (this.isObjectPropertiesNotNull(this.student)) {
      this.student.id = this.studentsService.getLastId() + 1;
      this.student.privateKey = UUID.UUID(); //generate uniqId
      this.studentsService.addStudent(this.student);
      this.dialogRef.close();
    }
  }

  private cancel(): void {
    this.dialogRef.close();
  }

  //text field validation (that there isn't any empty fields)
  private isObjectPropertiesNotNull(obj): boolean {
    if (Object.keys(obj).length < 8) {
      return false;
    }
    return true;
  }
}
