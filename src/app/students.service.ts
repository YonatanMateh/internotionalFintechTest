import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from './models/student';
import { data } from './initialStudent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StudentsService {
  students: any[];
  private studentSource = new BehaviorSubject(null);
  currentStudent = this.studentSource.asObservable();

  constructor(private http: HttpClient) { }

  changeStudent(student: any) {
    this.studentSource.next(student)
  }

  isSelctedStudent() {
    return this.studentSource.value ? true : false;
  }
  getAllStudents() {
    this.students = data;
    return this.students;
  }

  getLastId() {
    return this.students[this.students.length - 1].id;
  }

  addStudent(student: Student) {
    this.students.push(student);
  }
  updateStudent(student: Student) {
    let index = this.students.findIndex(currentStudent => currentStudent.id == student.id);
    this.students[index] = student;
    this.changeStudent(null);
  }

  removeStudent() {
    console.log(this.studentSource.value);
    const id = this.studentSource.value.student.id;
    const index = this.students.findIndex(obj => obj.id === id);
    console.log(index);
    this.students.splice(index, 1);
    this.changeStudent(null);
  }

  filterStudents(searchText: string, callback: Function) {
    // console.log(searchText.split(':'));
    let args = searchText.replace(/^\s+|\s+$/g, "").split(/\s*([\:\<\>])+\s*/)
    let type = this.getFilterType(args[0]);
    let operator = args[1];
    let num = args[2];
    if (type && operator && num) {
      if(type === "date") {
        callback(this.isValidDate(num) ? null : "Invalid Date")
      }
    } else {
      callback('invalid input');
    }
  }

  isValidDate(date: string) {
    let dateCheck = new Date(date);
    return dateCheck.toString() !== "Invalid Date";//(new Date(date)) != "Invalid Date";// && !isNaN(new Date(date));
  }

  getFilterType(text: string) {
    switch (text.toLowerCase()) {
      case 'id': case 'grade': case 'date':
        return text.toLowerCase();
      default: return null;
    }
  }

  argsValidation(type: string, args: any) {

  }

}
