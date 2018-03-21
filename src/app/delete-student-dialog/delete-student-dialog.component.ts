import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentsService } from '../students.service';
import { EditButtonsComponent } from '../edit-buttons/edit-buttons.component';
@Component({
  selector: 'app-delete-student-dialog',
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.css']
})
export class DeleteStudentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditButtonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private studentsService: StudentsService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
 
  removeStudent() {
    this.studentsService.removeStudent();
    this.dialogRef.close();
  }


}
