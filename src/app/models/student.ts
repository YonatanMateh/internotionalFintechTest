import { Grade } from './Grade'
export class Student {
  id: number;
  first_name : string;
  last_name: string;
  email: string;
  Date: string;
  Address?: string;
  Country: string;
  Grades: Array<Grade>;
  Zip: string;
}