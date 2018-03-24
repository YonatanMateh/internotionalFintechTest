import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { StatisticsService } from '../statistics.service';
import { StateService } from '../state.service';

@Component({
  selector: 'statistics-selection',
  templateUrl: './statistics-selection.component.html',
  styleUrls: ['./statistics-selection.component.css']
})
export class StatisticsSelectionComponent implements OnInit {
  studentsList: Array<string>;
  coursesList: Array<string>;
  // dataModel;
  selectedStudents: string[];
  selectedCourses: string[];
  // selectedStudentsToPass: String[];
  // selectedCoursesToPass: String[];
  constructor(private studentsService: StudentsService,
    private statisticsService: StatisticsService,
    private stateService: StateService) { }

  ngOnInit() {
    this.selectedStudents = this.stateService.selectedStudents || [];
    this.selectedCourses = this.stateService.selectedCourses || [];

    this.studentsList = Array.from(this.studentsService.getStudentsList());
    this.coursesList = Array.from(this.studentsService.getCoursesList());
    this.statisticsService.changeCourses(
      this.selectedCourses.length > 0 ? this.selectedCourses : this.coursesList);
      this.statisticsService.changeStudents(
        this.selectedStudents.length > 0 ? this.selectedStudents : this.studentsList);
   
  }
  config = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description,
    search: false //enables the search plugin to search in the list
  }
  //if(selectedStudents) {
    // selectedOptions = this.selectedStudents;
  //}

  

  coursesSelectionChanged() {

    this.statisticsService.changeCourses(
      this.selectedCourses.length > 0 ? this.selectedCourses : this.coursesList);
  }

  studentSelectionChanged() {
    this.statisticsService.changeStudents(
      this.selectedStudents.length > 0 ? this.selectedStudents : this.studentsList);
  }

  ngOnDestroy() {
    this.stateService.selectedStudents = this.selectedStudents || null;
    this.stateService.selectedCourses = this.selectedCourses || null;
    console.log('state ', this.stateService);
  }
}
