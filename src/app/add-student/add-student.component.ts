import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentsService } from '../students.service';
import { EditButtonsComponent } from '../edit-buttons/edit-buttons.component';
import { Student } from '../models/student';
import { Grade } from '../models/Grade';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student: Student;
  grade: Grade;

  constructor(public dialogRef: MatDialogRef<EditButtonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentsService: StudentsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.student = new Student();
    this.grade = new Grade();
    this.student.Grades = [];
  }

  saveStudent() {
    console.log(this.isObjectPropertiesNotNull(this.student));
    if (this.isObjectPropertiesNotNull(this.student)) {
      this.student.id = this.studentsService.getLastId() + 1;
      this.student.Grades.push(this.grade);
      this.studentsService.addStudent(this.student);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  isObjectPropertiesNotNull(obj) {
    console.log(Object.keys(obj).length);
    if (Object.keys(obj).length < 8) {
      return false;
    }
    return true;
  }
}
