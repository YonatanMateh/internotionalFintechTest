import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Student } from './models/student';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { data } from './initialStudent';
import { FilterObj } from './models/FilterObj';
import { UUID } from 'angular2-uuid';

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

  private updateLists() {
    this.studentList.clear();
    this.coursesList.clear();
    this.students.forEach(student => {
      let { firstName, lastName, course } = student
      this.studentList.add(firstName + ' ' + lastName);
      this.coursesList.add(course);
    })
  }

  changeStudent(student: any) {
    this.studentSource.next(student)
  }

  changeFilterData(data: FilterObj) {
    this.filterSource.next(data);
  }

  isSelctedStudent(): boolean {
    return this.studentSource.value ? true : false;
  }
  getAllStudents(): Student[] {
    return this.students;
  }

  getLastId(): number {
    return this.students[this.students.length - 1].id;
  }

  getStudentsList(): Set<string> {
    return this.studentList;
  }

  getCoursesList(): Set<string> {
    return this.coursesList;
  }

  addStudent(student: Student) {
    this.students.push(student);
    this.updateLists();

  }

  updateStudent(student: Student) {
    let index = this.students.findIndex(currentStudent => currentStudent.privateKey == student.privateKey);
    this.students[index] = student;
    this.updateLists();
    this.changeStudent(null);
  }

  removeStudent() {
    const { privateKey } = this.studentSource.value;
    let index = this.students.findIndex(currentStudent => currentStudent.privateKey == privateKey);
    this.students.splice(index, 1);
    this.updateLists();
    this.changeStudent(null);
  }

  filterStudents(searchText: string, callback: Function) {
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

  private isValidDate(date: string): boolean {
    let dateCheck = new Date(date);
    return dateCheck.toString() !== "Invalid Date";
  }

  private isNumeric(value): boolean {
    return /^\d+$/.test(value);
  }

  private getFilterType(text: string): string {
    switch (text.toLowerCase()) {
      case 'id': case 'grade': case 'date':
        return text.toLowerCase();
      default: return null;
    }
  }

}
