import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { StatisticsService } from '../statistics.service';

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
  selectedCourses: String[];
  // selectedStudentsToPass: String[];
  // selectedCoursesToPass: String[];
  constructor(private studentsService: StudentsService,
    private statisticsService: StatisticsService) { }
  ngOnInit() {
    this.studentsList = Array.from(this.studentsService.getStudentsList());
    this.coursesList = Array.from(this.studentsService.getCoursesList());
     this.statisticsService.changeStudents(this.studentsList);
     this.statisticsService.changeCourses(this.coursesList);
  // this.selectedStudentsToPass = this.studentsList;
  // this.selectedCoursesToPass = this.coursesList;
   }
  config = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description,
    search: false //enables the search plugin to search in the list
  }

  coursesSelectionChanged(a) {
    // this.abc = Object.assign({}, this.selectedStudents);
    // if(this.selectedCourses.length < 1) {
    //   this.selectedCoursesToPass = this.coursesList;
    // } else {
    //   this.selectedCoursesToPass = Object.assign([], this.selectedCourses);
    // }
    this.statisticsService.changeCourses(
      this.selectedCourses.length > 0 ? this.selectedCourses : this.coursesList);
  }

  studentSelectionChanged(a) {
    this.statisticsService.changeStudents(
      this.selectedStudents.length > 0 ? this.selectedStudents : this.studentsList);
    // console.log(this.selectedStudents);
    // if(this.selectedStudents.length < 1) {
    //   this.selectedStudentsToPass = this.studentsList;
    // } else {
    //   this.selectedStudentsToPass = Object.assign([], this.selectedStudents);
    // }
  }
}
