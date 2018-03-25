import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { StudentsService } from '../students.service';
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

  //actions
  private addStudent(): void {
    let dialogRef = this.dialog.open(AddStudentComponent, {
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private openDeleteDialog(): void {
    if (this.studentsService.isSelctedStudent()) {
      this.studentsService.removeStudent();
    } else {
      alert("You need to select student!");
    }
  }
}
