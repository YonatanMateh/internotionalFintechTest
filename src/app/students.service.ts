import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  currentStudent = this.studentSource.asObservable();
  currentFilterObj = this.filterSource.asObservable();

  constructor(private http: HttpClient) {
    let a = [];
    this.students = [];
    data.forEach((temp) => {
      // for (let temp of data) {
      for (let grade of temp.Grades) {
        let student = new Student();
        student.id = temp.id;
        student.privateKey = UUID.UUID();
        student.firstName = temp.first_name;
        student.lastName = temp.last_name;
        student.email = temp.email;
        student.address = temp.Address;
        student.country = temp.Country;
        student.zip = temp.Zip || '';
        student.date = grade.Date;
        student.grade = grade.Grade;
        student.course = grade.Course;
        console.log(student.grade);
        this.students.push(student);
      }
      //}
    });
  }

  changeStudent(student: any) {
    console.log(student);
    this.studentSource.next(student)
  }

  changeFilterData(data: FilterObj) {
    this.filterSource.next(data);
  }

  isSelctedStudent(): boolean {
    return this.studentSource.value ? true : false;
  }
  getAllStudents(): Student[] {
    // this.students = data;

    console.log('get', this.students);
    return this.students;
  }

  getLastId(): number {
    return this.students[this.students.length - 1].id;
  }

  getSetOfStudents() {

  }
  addStudent(student: Student) {
    this.students.push(student);
  }

  updateStudent(student: Student) {
    // let { index } = this.studentSource.value;

     let index = this.students.findIndex(currentStudent => currentStudent.privateKey == student.privateKey);
console.log(student, index);
    this.students[index] = student;
    this.changeStudent(null);
  }

  removeStudent() {
    console.log('a', this.studentSource.value.id);
    console.log(this.studentSource.value);
    // let { index } = this.studentSource.value;
       const {privateKey} = this.studentSource.value;

    //   // const index = this.students.findIndex(obj => obj.id === id);

    //   // console.log(index);
    let index = this.students.findIndex(currentStudent => currentStudent.privateKey == privateKey);

    this.students.splice(index, 1);

    //  this.students = this.students.filter(student => student.id !== id);
    //  console.log(this.students);
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
      console.log(this.isNumeric(text), text);
      callback(isError ? "Invalid Number" : null)
    } else {
      callback("Invalid input");
    }
// console.log(text);

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
