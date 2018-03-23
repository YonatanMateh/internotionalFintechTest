import { Component, OnInit, Input } from '@angular/core';
import { calculateStudentsAvarge } from '../averageCalculation';
@Component({
  selector: 'average-window',
  templateUrl: './average-window.component.html',
  styleUrls: ['./average-window.component.css']
})
export class AverageWindowComponent implements OnInit {
  @Input() students;
  @Input() courses;
  constructor() { }

  ngOnInit() {
    console.log(this.students);
    // console.log(calculateStudentsAvarge('a'));
  }

}
