import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStudents'
})
export class FilterStudentsPipe implements PipeTransform {

  transform(array: any[], filterType: string, filterValue: number): any {
    console.log('v ',array, filterType, filterValue);
   let a = array.find(x => x.id == 1)
    console.log(a);
   return [a];
  }

}
