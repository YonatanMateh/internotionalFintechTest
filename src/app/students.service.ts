import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UUID } from 'angular2-uuid';

import { Student } from './models/student';
import { data } from './initialStudent';
import { FilterObj } from './models/FilterObj';
/*
 this service is the main service and contain akk the student data/filtering/students and courses lists-sets
*/
@Injectable()
export class StudentsService {
  private students: Student[];
  private studentSource = new BehaviorSubject(null);
  private filterSource: BehaviorSubject<FilterObj> = new BehaviorSubject(null);
  private studentList: Set<string>;
  private coursesList: Set<string>;

  currentStudent = this.studentSource.asObservable();
  currentFilterObj = this.filterSource.asObservable();

  constructor() {
    this.students = [];
    // first initialization
    // getting the data from the json file and converted to normal object
    data.forEach((temp: any) => {
      for (let grade of temp.Grades) {
        let student = new Student();
        student.id = temp.id;
        student.privateKey = UUID.UUID();
        student.firstName = temp.first_name;
        student.lastName = temp.last_name;
        student.email = temp.email;
        student.address = temp.Address;
        student.country = temp.Country;
        student.zip = temp.Zip || "";
        student.date = grade.Date;
        student.grade = grade.Grade;
        student.course = grade.Course;
        this.students.push(student);
      }
    });

    this.studentList = new Set();
    this.coursesList = new Set();
    this.updateLists();
  }


  changeStudent(student: any): void {
    this.studentSource.next(student)
  }

  changeFilterData(data: FilterObj): void{
    this.filterSource.next(data);
  }
  

  //getters
  getAllStudents(): Student[] {
    return this.students;
  }

  // get the last id (when creating a new student)
  getLastId(): number {
    return this.students[this.students.length - 1].id;
  }

  getStudentsList(): Set<string> {
    return this.studentList;
  }

  getCoursesList(): Set<string> {
    return this.coursesList;
  }

  isSelctedStudent(): boolean {
    return this.studentSource.value ? true : false;
  }
  
//public methods
  addStudent(student: Student): void {
    this.students.push(student);
    this.updateLists();
  }

  //update student after change his data
  updateStudent(student: Student): void {
    let index = this.students.findIndex(currentStudent => currentStudent.privateKey == student.privateKey);
    this.students[index] = student;
    this.updateLists();
    this.changeStudent(null);
  }

  //delete student from the students array
  removeStudent(): void {
    const { privateKey } = this.studentSource.value;
    let index = this.students.findIndex(currentStudent => currentStudent.privateKey == privateKey);
    this.students.splice(index, 1);
    this.updateLists();
    this.changeStudent(null);
  }

  // checking the validaton of filter input
  filterStudents(searchText: string, callback: Function): void {
    if (!searchText) {
      this.changeFilterData(null);
      return;
    }
    let args = searchText.replace(/^\s+|\s+$/g, "").split(/\s*([\:\<\>])+\s*/)
    let type = this.getFilterType(args[0]);
    let operator = args[1];
    let text = args[2];
    let isError = false;

    if (type === "date") {
      isError = !this.isValidDate(text);
      callback(isError ? "Invalid Date" : null)
    } else if (type) {
      isError = !this.isNumeric(text);
      callback(isError ? "Invalid Number" : null)
    } else {
      callback("Invalid input");
    }

    if (type && operator && text && !isError) {
      let data = new FilterObj(type, text, operator);
      this.changeFilterData(data);
    }
  }

  //methods
  private getFilterType(text: string): string {
    switch (text.toLowerCase()) {
      case 'id': case 'grade': case 'date':
        return text.toLowerCase();
      default: return null;
    }
  }

  // generating the students/courses lists-sets (only by name)
  private updateLists() {
    this.studentList.clear();
    this.coursesList.clear();
    this.students.forEach(student => {
      let { firstName, lastName, course } = student
      this.studentList.add(firstName + ' ' + lastName);
      this.coursesList.add(course);
    })
  }

  //validation method
  private isValidDate(date: string): boolean {
    let dateCheck = new Date(date);
    return dateCheck.toString() !== "Invalid Date";
  }

  private isNumeric(value): boolean {
    return /^\d+$/.test(value);
  }

}
