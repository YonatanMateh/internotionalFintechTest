import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: '[student-row]',
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.css']
})
export class StudentRowComponent implements OnInit {

  @Input() student: any;
  @Input() grade: any;
 // students: any[];
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    console.log(this.studentsService.getAllStudents());
    // this.students = this.studentsService.getAllStudents();
  }
}
