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

}
