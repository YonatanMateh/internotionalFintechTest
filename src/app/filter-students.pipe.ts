import { Pipe, PipeTransform } from '@angular/core';
import { FilterObj } from './models/FilterObj';
@Pipe({
  name: 'filterStudents',
  pure: false
})
export class FilterStudentsPipe implements PipeTransform {

  transform(array: any[], filter: FilterObj): any {
    if (filter) {
      if (filter.type != 'date') {
        switch (filter.operator) {
          case ':':
            return array.filter(x => x[filter.type] == filter.text);
          case '>':
            return array.filter(x => x[filter.type] > filter.text);
          case '<':
            return array.filter(x => x[filter.type] < filter.text);
          default:
            return array;
        }
      } else {
        switch (filter.operator) {
          case ':':
            return array.filter(x => new Date(x.date).valueOf() == new Date(filter.text).valueOf());
          case '>':
            return array.filter(x => new Date(x.date) > new Date(filter.text));
          case '<':
            return array.filter(x => new Date(x.date) < new Date(filter.text));
          default:
            return array;
        }
      }
    }
    return array;
  }

}
