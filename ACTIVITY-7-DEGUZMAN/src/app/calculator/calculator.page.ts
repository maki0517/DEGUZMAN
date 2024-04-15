import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage {

  fieldText: string = "";
  operators: string = "";
  result: string = "";


  constructor() { }

  clickBtn(value: number) {
    const newNumber: string = value.toString();
    this.fieldText += value;
    this.result += value;
  }

  clearBtn() {
    this.fieldText = "";
    this.operators = "";
    this.result = "";
  }
  
  operation(operator: string) {
    this.operators = operator;
    this.fieldText += this.operators.toString();
    this.result += this.operators.toString();;
  }

  equalBtn() {
    let newResult: string;
    if (this.fieldText && this.operators) {
      const parts = this.fieldText.split(/([\+\-\*\/])/);
        if (parts) {
            let result = parseInt(parts[0]);
            console.log(result)
            for (let i = 1; i < parts.length; i += 2) {
                const operator = parts[i];
                console.log(operator)
                const operand = parseInt(parts[i + 1]);
                console.log(operand)
                switch (operator) {
                    case '+':
                        result += operand;
                        console.log(result)
                        break;
                    case '-':
                        result -= operand;
                        console.log(result)
                        break;
                    case '*':
                        result *= operand;
                        console.log(result)
                        break;
                    case '/':
                        if (operand !== 0) {
                            result /= operand;
                            console.log(result)
                        } else {
                            newResult = 'Error: Division by zero';
                            this.result = newResult;
                            console.log(this.result);
                            return;
                        }
                        break;
                    default:
                      break;
                }
            }
            newResult = result.toString();
            this.result = newResult;
        }
    }
  }
}