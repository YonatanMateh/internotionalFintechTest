export class FilterObj {
  type: string;
  text: string;
  operator: string;
  constructor(type: string, text: string, operator: string) {
    this.type = type;
    this.text = text;
    this.operator = operator;
  }
}