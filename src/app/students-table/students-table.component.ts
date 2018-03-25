import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})

export class StudentsTableComponent implements OnInit {
  private pageNumber:number = 1;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
  }

}
