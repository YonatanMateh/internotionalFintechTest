import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Student } from './models/student';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudentsService } from './students.service';
@Injectable()
export class StatisticsService {
  private students;
  private studentsList;
  private coursesList;

  private selectedStudentsSource: BehaviorSubject<any> = new BehaviorSubject(null);
  private selectedCoursesSource: BehaviorSubject<any> = new BehaviorSubject(null);

  selectedStudents = this.selectedStudentsSource.asObservable();
  selectedCourses = this.selectedCoursesSource.asObservable();

  constructor(private studentsService: StudentsService) {
    this.studentsList = Array.from(this.studentsService.getStudentsList());
    this.coursesList = Array.from(this.studentsService.getCoursesList());
    this.students = this.studentsService.getAllStudents();
  }

  changeStudents(students: any) {
    this.studentsList = students;
    let studentsAverage = this.calculateAvarageByStudent(students);
    let coursesAverage = this.calculateAvarageByCourse();
    this.selectedStudentsSource.next(this._updateObject(studentsAverage, coursesAverage));
  }

  changeCourses(courses: any) {
    this.coursesList = courses;
    let studentsAverage = this.calculateAvarageByStudent(this.studentsList);
    let coursesAverage = this.calculateAvarageByCourse();
    this.selectedCoursesSource.next(this._updateObject(studentsAverage, coursesAverage));
  }

  private _updateObject(studentsAverage, coursesAverage): any {
    return {
      students: this.studentsList,
      courses: this.coursesList,
      studentsAverage: studentsAverage,
      coursesAverage: coursesAverage
    };
  }

  getSelectedStudents() {
    return this.studentsList;
  }

  getSelectedCourses() {
    return this.coursesList;
  }

  calculateAvarageByStudent(students) {
    let set = new Set(this.coursesList);
    let averageArr = [];
    for (let currentStudent of students) {
      let counter = 0;
      let sum = 0;
      let average = 0;
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

  calculateAvarageByCourse() {
    let set = new Set(this.studentsList);
    let averageArr = [];
    for (let course of this.coursesList) {
      let counter = 0;
      let sum = 0;
      let average = 0;
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
