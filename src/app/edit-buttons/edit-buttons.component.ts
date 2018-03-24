import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'edit-buttons',
  templateUrl: './edit-buttons.component.html',
  styleUrls: ['./edit-buttons.component.css']
})
export class EditButtonsComponent implements OnInit {

  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  addStudent() {
    let dialogRef = this.dialog.open(AddStudentComponent, {
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(): void {
    if (this.studentsService.isSelctedStudent()) {

      this.studentsService.removeStudent();
    } else {
      alert("You need to select student!");
    }
  }
}
