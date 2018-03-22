import { Pipe, PipeTransform } from '@angular/core';
import { FilterObj } from './models/FilterObj';

@Pipe({
  name: 'filterGrades'
})
export class FilterGradesPipe implements PipeTransform {

  transform(array: any[], filter: FilterObj): any {
    if (filter) {
      switch (filter.type) {
        case 'grade':
          switch (filter.operator) {
            case ':':
              return array.filter(x => x.Grade == filter.text);
            case '>':
              return array.filter(x => x.Grade > filter.text);
            case '<':
              return array.filter(x => x.Grade < filter.text);
            default:
              return array;
          }
        case 'date':

        default:
          return array;
      }
    }
    return array;
  }

}
