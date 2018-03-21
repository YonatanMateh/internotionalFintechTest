import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Student } from './models/student';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { data } from './initialStudent';
import { FilterObj } from './models/FilterObj';

@Injectable()
export class StudentsService {
  students: any[];
  private studentSource = new BehaviorSubject(null);
  private filterSource: BehaviorSubject<FilterObj> = new BehaviorSubject(null);

  currentStudent = this.studentSource.asObservable();
  currentFilterObj = this.filterSource.asObservable();

  constructor(private http: HttpClient) { }

  changeStudent(student: any) {
    this.studentSource.next(student)
  }

  changeFilterData(data: FilterObj) {
    this.filterSource.next(data);
  }

  isSelctedStudent(): boolean {
    return this.studentSource.value ? true : false;
  }
  getAllStudents(): any[] {
    this.students = data;
    return this.students;
  }

  getLastId(): number {
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
