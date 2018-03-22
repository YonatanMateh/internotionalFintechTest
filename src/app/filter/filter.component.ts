import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterText: string;
  constructor(private studentsService: StudentsService) { }

  onSubmit() {
    console.log('object ',this.filterText);
 //   if(this.filterText) {
    this.studentsService.filterStudents(this.filterText, error => {
      if(error) alert(error);
    });
 // }
  }
  ngOnInit() {
  }

}
