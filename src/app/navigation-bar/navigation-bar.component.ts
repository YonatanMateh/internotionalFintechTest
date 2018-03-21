import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
  }

}
