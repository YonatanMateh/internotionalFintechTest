import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Student } from './models/student';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StudentsService } from './students.service';
@Injectable()
export class StatisticsService {
  // private studentSource = new BehaviorSubject(null);
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
    let arr = this.calculateAvarageByStudent(students);
    let coursesAverage =  this.calculateAvarageByCourse();
    let obj = {
      students: this.studentsList,
      courses: this.coursesList,
      averages: arr,
      coursesAverage: coursesAverage
    }
    // console.log(obj);

    this.selectedStudentsSource.next(obj);
  }

  changeCourses(courses: any) {
    this.coursesList = courses;
   // console.log(this.coursesList);
    let arr = this.calculateAvarageByStudent(this.studentsList);
    let coursesAverage =  this.calculateAvarageByCourse();
    let obj = {
      students: this.studentsList,
      courses: this.coursesList,
      averages: arr,
      coursesAverage: coursesAverage
    }
    console.log(obj);
    this.selectedCoursesSource.next(obj);
    // this.changeStudents(this.students);
  }
  getSelectedStudents() {
    return this.studentsList;
  }

  getSelectedCourses() {
    return this.coursesList;
  }

  calculateAvarageByStudent(students) {
   
    let set = new Set(this.coursesList);
    // console.log(set);
    let averageArr = [];
    for (let currentStudent of students) {
      let counter = 0;
      let sum = 0;
      let average = 0;
      for (let student of this.students) {
        if (student.firstName + ' ' + student.lastName == currentStudent) {
          //console.log(currentStudent);
          
          if (set.has(student.course)) {
            counter++;
            // console.log(student.grade);
            sum += student.grade;
          }
        }
      }
      average = sum / counter;
      // console.log(average, sum, counter);
      averageArr.push(Number(average.toFixed(1)));
      // console.log(average);
    }
    return averageArr;
  }

  calculateAvarageByCourse() {
    let set = new Set(this.studentsList);
    let averageArr = [];
    for(let course of this.coursesList) {
      console.log(course);
      let counter = 0;
      let sum = 0;
      let average = 0;
      for(let student of this.students) {
       // console.log(student.course, course);
        if(student.course == course && set.has(student.firstName+' '+student.lastName)) {
          counter++;
          // console.log(student.grade);
          sum += student.grade;
        }
      }
      average = sum / counter;
       console.log(average, sum, counter);
      averageArr.push(Number(average.toFixed(1)));
    }
   return averageArr;
  }
}
