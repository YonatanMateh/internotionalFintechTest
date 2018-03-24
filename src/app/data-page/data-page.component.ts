import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})
export class DataPageComponent implements OnInit {
  isStudentChosen: boolean;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.currentStudent.subscribe(student => {
      this.isStudentChosen = student ? true : false;
    });
  }
}
