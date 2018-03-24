import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentsService } from '../students.service';
import { EditButtonsComponent } from '../edit-buttons/edit-buttons.component';
import { Student } from '../models/student';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student: Student;

  constructor(public dialogRef: MatDialogRef<EditButtonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentsService: StudentsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.student = new Student();
  }

  saveStudent() {
    if (this.isObjectPropertiesNotNull(this.student)) {
      this.student.id = this.studentsService.getLastId() + 1;
      this.student.privateKey = UUID.UUID();
      this.studentsService.addStudent(this.student);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  isObjectPropertiesNotNull(obj) {
    if (Object.keys(obj).length < 8) {
      return false;
    }
    return true;
  }
}
