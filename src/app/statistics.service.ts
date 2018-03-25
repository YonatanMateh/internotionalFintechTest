import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Student } from './models/student';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudentsService } from './students.service';
/*
this service contains the data and calculation for the statistics page 
*/
@Injectable()
export class StatisticsService {
  private students; // all the students objects
  private studentsList; //list of all students (by name)
  private coursesList; //list of all courses (by name)

  private selectedStudentsSource: BehaviorSubject<any> = new BehaviorSubject(null);
  private selectedCoursesSource: BehaviorSubject<any> = new BehaviorSubject(null);

  selectedStudents = this.selectedStudentsSource.asObservable();
  selectedCourses = this.selectedCoursesSource.asObservable();

  constructor(private studentsService: StudentsService) {
    this.studentsList = Array.from(this.studentsService.getStudentsList());
    this.coursesList = Array.from(this.studentsService.getCoursesList());
    this.students = this.studentsService.getAllStudents();
  }

  //public methods
  //calculate the average when the students or courses list has changed
  changeStudents(students: any): void {
    this.studentsList = students;
    let studentsAverage = this.calculateAvarageByStudent(students);
    let coursesAverage = this.calculateAvarageByCourse();
    this.selectedStudentsSource.next(this.updateObject(studentsAverage, coursesAverage));
  }

  changeCourses(courses: any): void {
    this.coursesList = courses;
    let studentsAverage = this.calculateAvarageByStudent(this.studentsList);
    let coursesAverage = this.calculateAvarageByCourse();
    this.selectedCoursesSource.next(this.updateObject(studentsAverage, coursesAverage));
  }

  getSelectedStudents(): Observable<any> {
    return this.studentsList;
  }

  getSelectedCourses(): Observable<any> {
    return this.coursesList;
  }
  //methods
  private updateObject(studentsAverage, coursesAverage): any {
    return {
      students: this.studentsList,
      courses: this.coursesList,
      studentsAverage: studentsAverage,
      coursesAverage: coursesAverage
    };
  }

  //returns an array of the average for each student
  private calculateAvarageByStudent(students): number[] {
    let set = new Set(this.coursesList);
    let averageArr = [];
    //loop for each student in the current students list
    for (let currentStudent of students) {
      let counter = 0, sum = 0, average = 0;
      //loop for every student in the students objects array and check if equal to
      // one of the chosen students (note: should use id, and not name...)
      for (let student of this.students) {
        if (student.firstName + ' ' + student.lastName == currentStudent) {
          if (set.has(student.course)) {
            counter++;
            sum += student.grade;
          }
        }
      }
      average = sum / counter;
      averageArr.push(Number(average.toFixed(1)));
    }
    return averageArr;
  }

  //returns an array of the average for each course
  private calculateAvarageByCourse(): number[] {
    let set = new Set(this.studentsList);
    let averageArr = [];
    //loop for every course in the current courses list
    for (let course of this.coursesList) { 
      let counter = 0, sum = 0, average = 0;
      //loop for each student and check if he has this specific course
      for (let student of this.students) { 
        if (student.course == course && set.has(student.firstName + ' ' + student.lastName)) {
          counter++;
          sum += student.grade;
        }
      }
      average = sum / counter;
      averageArr.push(Number(average.toFixed(1)));
    }
    return averageArr;
  }
}
