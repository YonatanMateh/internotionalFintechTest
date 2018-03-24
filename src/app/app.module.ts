import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
  import {MatDialogModule, } from '@angular/material/dialog';
  import { MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule, 
    MatNativeDateModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { SelectDropDownModule } from 'ngx-select-dropdown'

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FilterComponent } from './filter/filter.component';
import { EditButtonsComponent } from './edit-buttons/edit-buttons.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { DetailsWindowComponent } from './details-window/details-window.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StudentsService } from './students.service';
import { StatisticsService } from './statistics.service';
import { StateService } from './state.service';

import { DataPageComponent } from './data-page/data-page.component';
import { RoutingModule } from './routing/routing.module';
import { StudentRowsComponent } from './student-rows/student-rows.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FilterStudentsPipe } from './filter-students.pipe';
import { StatisticsSelectionComponent } from './statistics-selection/statistics-selection.component';
import { ChartViewComponent } from './chart-view/chart-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FilterComponent,
    EditButtonsComponent,
    StudentsTableComponent,
    DetailsWindowComponent,
    DataPageComponent,
    StudentRowsComponent,
    AddStudentComponent,
    FilterStudentsPipe,
    StatisticsSelectionComponent,
    ChartViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule, 
    MatNativeDateModule,
    SelectDropDownModule
    ],
  entryComponents: [AddStudentComponent, EditButtonsComponent],
  providers: [StudentsService, StatisticsService, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
