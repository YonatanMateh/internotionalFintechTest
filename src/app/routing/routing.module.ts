import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DataPageComponent } from '../data-page/data-page.component';
import { StatisticsPageComponent } from '../statistics-page/statistics-page.component';

const routes: Routes = [
  { path: '', component: DataPageComponent },
  { path: 'statistics', component: StatisticsPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }