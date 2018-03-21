import { Component, OnInit, Input } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  p:number=1;
  students: any[];
  @Input() maxSize: number = 5;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    console.log(this.studentsService.getAllStudents());
    this.students = this.studentsService.getAllStudents();
  }

}
