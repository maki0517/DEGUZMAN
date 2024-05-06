import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage {
  constructor( private router: Router) { }
  
  display: string = '0';
  operator: string | null = null;
  operand1: number | null = null;
  operand2: number | null = null;

  buttons: string[] = [
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    'C',
    '0',
    '=',
    '+',
  ];

  buttonClick(button: string) {
    if (button === 'C') {
      this.clear();
    } else if (button === '=') {
      this.calculate();
    } else if (['+', '-', '*', '/'].includes(button)) {
      this.setOperator(button);
    } else {
      this.addToDisplay(button);
    }
  }

  clear() {
    this.display = '0';
    this.operator = null;
    this.operand1 = null;
    this.operand2 = null;
  }

  addToDisplay(value: string) {
    if (this.display === '0') {
      this.display = value;
    } else {
      this.display += value;
    }
  }

  setOperator(operator: string) {
    if (this.operator !== null) {
      this.calculate();
    }
    this.operator = operator;
    this.operand1 = parseFloat(this.display);
    this.display = '0';
  }

  calculate() {
    if (this.operator && this.operand1 !== null && this.operand2 === null) {
      this.operand2 = parseFloat(this.display);
      switch (this.operator) {
        case '+':
          this.display = (this.operand1 + this.operand2).toString();
          break;
        case '-':
          this.display = (this.operand1 - this.operand2).toString();
          break;
        case '*':
          this.display = (this.operand1 * this.operand2).toString();
          break;
        case '/':
          if (this.operand2 === 0) {
            this.display = 'Error';
          } else {
            this.display = (this.operand1 / this.operand2).toString();
          }
          break;
      }
      this.operator = null;
      this.operand1 = null;
      this.operand2 = null;
    }
  }
  isOperator(value: string): boolean {
    return ['+', '-', '*', '/'].includes(value);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
