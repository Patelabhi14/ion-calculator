import { Component } from '@angular/core';
import { evaluate } from 'mathjs';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	expression: string = '';
	result: string = '';
	lastOperator: string = '';
	isOperatorAdded: boolean;

	// value = '0';
	// oldValue = '0';
	// lastOperator = 'x';
	// readyForNewInput = true;

	constructor() {}

	// onButtonPress(symbol) {
	// 	if (typeof symbol === 'number') {
	// 		if (this.readyForNewInput) this.value = '' + symbol;
	// 		else this.value += '' + symbol;
	// 		this.readyForNewInput = false;
	// 	} else if (symbol === 'c') {
	// 		this.value = '0';
	// 		this.readyForNewInput = true;
	// 	} else if (symbol === '=') {
	// 		if (this.lastOperator === 'x')
	// 			this.value = '' + parseInt(this.oldValue) * parseInt(this.value);
	// 		else if (this.lastOperator === '-')
	// 			this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
	// 		else if (this.lastOperator === '+')
	// 			this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
	// 		else if (this.lastOperator === '/')
	// 			this.value = '' + parseInt(this.oldValue) / parseInt(this.value);
	// 		this.readyForNewInput = true;
	// 	} else {
	// 		// operator
	// 		this.readyForNewInput = true;
	// 		this.oldValue = this.value;
	// 		this.lastOperator = symbol;
	// 	}
	// }

	onButtonPress(symbol) {
		if (typeof symbol === 'number') {
			this.expression += `${symbol}`;
		} else if (symbol === '=') {
			let tempExpression = this.expression.replace('x', '*');
			this.result = evaluate(tempExpression);
			this.isOperatorAdded = false;
		} else if (
			symbol === '+' ||
			symbol === '-' ||
			symbol === 'x' ||
			symbol === '/'
		) {
			this.expression += ' ' + symbol + ' ';
		} else if (symbol === 'ac') {
			this.result = '';
			this.expression = '';
		}
	}
}
