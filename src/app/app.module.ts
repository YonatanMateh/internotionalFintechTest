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
// import { StudentRowComponent } from './student-row/student-row.component';
import { DetailsWindowComponent } from './details-window/details-window.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StudentsService } from './students.service';

import { DataPageComponent } from './data-page/data-page.component';
import { RoutingModule } from './routing/routing.module';
import { StudentRowsComponent } from './student-rows/student-rows.component';
import { PaginationComponent } from './pagination/pagination.component';
// import { DeleteStudentDialogComponent } from './delete-student-dialog/delete-student-dialog.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { FilterStudentsPipe } from './filter-students.pipe';
import { FilterGradesPipe } from './filter-grades.pipe';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { StatisticsSelectionComponent } from './statistics-selection/statistics-selection.component';
import { AverageWindowComponent } from './average-window/average-window.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FilterComponent,
    EditButtonsComponent,
    StudentsTableComponent,
    // StudentRowComponent,
    DetailsWindowComponent,
    DataPageComponent,
    StudentRowsComponent,
    PaginationComponent,
    // DeleteStudentDialogComponent,
    AddStudentComponent,
    FilterStudentsPipe,
    FilterGradesPipe,
    StatisticsPageComponent,
    StatisticsSelectionComponent,
    AverageWindowComponent
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
  providers: [StudentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
