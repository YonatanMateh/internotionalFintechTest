import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'statistics-selection',
  templateUrl: './statistics-selection.component.html',
  styleUrls: ['./statistics-selection.component.css']
})
export class StatisticsSelectionComponent implements OnInit {
  studentsList: Array<string>;
  coursesList: Array<string>;
  dataModel;
  selectedStudents: String[];
  selectedCourses;
  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
  //  console.log() 
  this.studentsList = Array.from(this.studentsService.getStudentsList());
  this.coursesList = Array.from(this.studentsService.getCoursesList())
  }
  config = {
    displayKey:"description", //if objects array passed which key to be displayed defaults to description,
    search: false //enables the search plugin to search in the list
    }

    coursesSelectionChanged(a) {
      console.log(a);
    }

    studentSelectionChanged(a) {
      console.log(this.selectedStudents);

    }
}
