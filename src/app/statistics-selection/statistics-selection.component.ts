import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { StatisticsService } from '../statistics.service';
import { StateService } from '../state.service';
/*
  this component contain all the elements for the statistics page
*/
@Component({
  selector: 'statistics-selection',
  templateUrl: './statistics-selection.component.html',
  styleUrls: ['./statistics-selection.component.css']
})
export class StatisticsSelectionComponent implements OnInit {
  private studentsList: Array<string>;
  private coursesList: Array<string>;
  private selectedStudents: string[];
  private selectedCourses: string[];

  constructor(private studentsService: StudentsService,
    private statisticsService: StatisticsService,
    private stateService: StateService) { }

  ngOnInit() {
    //getting the saved data (from previous state)
    this.selectedStudents = this.stateService.selectedStudents;
    this.selectedCourses = this.stateService.selectedCourses;

    this.studentsList = Array.from(this.studentsService.getStudentsList());
    this.coursesList = Array.from(this.studentsService.getCoursesList());

    //the change of the student have to be first - important
    this.statisticsService.changeStudents(
      this.selectedStudents.length > 0 ? this.selectedStudents : this.studentsList);
    this.statisticsService.changeCourses(
      this.selectedCourses.length > 0 ? this.selectedCourses : this.coursesList);
  }

  config = {
    displayKey: "description",
    search: false
  }

  //save the current state when leaving the component 
  ngOnDestroy() {
    this.stateService.selectedStudents = this.selectedStudents || [];
    this.stateService.selectedCourses = this.selectedCourses || [];
  }
  
  //actions
  //updating the service with the relevant students/courses and calculating the average agian
  private coursesSelectionChanged() {
    this.statisticsService.changeCourses(
      this.selectedCourses.length > 0 ? this.selectedCourses : this.coursesList);
  }

  private studentSelectionChanged() {
    this.statisticsService.changeStudents(
      this.selectedStudents.length > 0 ? this.selectedStudents : this.studentsList);
  }

}
