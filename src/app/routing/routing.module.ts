import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataPageComponent } from '../data-page/data-page.component';
import { StatisticsSelectionComponent } from '../statistics-selection/statistics-selection.component';

const routes: Routes = [
  { path: '', component: DataPageComponent },
  { path: 'statistics', component: StatisticsSelectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }