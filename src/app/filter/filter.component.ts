import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { StateService } from '../state.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterText: string;
  constructor(private studentsService: StudentsService,
    private stateService: StateService) { }

  onSubmit() {
    console.log('object ',this.filterText);
 //   if(this.filterText) {
    this.studentsService.filterStudents(this.filterText, error => {
      if(error) alert(error);
    });
 // }
  }
  ngOnInit() {
    if(this.stateService.currentFilter) {
    let { text, type, operator} = this.stateService.currentFilter;
    this.filterText = type + operator + ' ' + text;
    }
  }

}
