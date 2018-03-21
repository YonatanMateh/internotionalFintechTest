import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterText;
  constructor() { }
  onSubmit() {
    console.log('object ',this.filterText);
  }
  ngOnInit() {
  }

}
