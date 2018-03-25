import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { StateService } from '../state.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  private filterText: string;
  constructor(private studentsService: StudentsService,
    private stateService: StateService) { }

  ngOnInit() {
    //getting the saved data from the state service
    if (this.stateService.currentFilter) {
      let { text, type, operator } = this.stateService.currentFilter;
      this.filterText = type + operator + ' ' + text;
    }
  }

  private onSubmit() {
    this.studentsService.filterStudents(this.filterText, error => {
      if (error) alert(error);
    });
  }
}
