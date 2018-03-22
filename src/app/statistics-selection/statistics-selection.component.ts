import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'statistics-selection',
  templateUrl: './statistics-selection.component.html',
  styleUrls: ['./statistics-selection.component.css']
})
export class StatisticsSelectionComponent implements OnInit {
  dropdownOptions= ['a','b','c'];
  dataModel;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.getSetOfStudents();
  }
  config = {
   // displayKey:"description", //if objects array passed which key to be displayed defaults to description,
    search: false //enables the search plugin to search in the list
    }
}
