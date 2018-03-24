import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.css']
})
export class StatisticsPageComponent implements OnInit {

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
   console.log('stats init');
  }

  ngOnDestroy() {
    console.log('stats end');
  }

}
