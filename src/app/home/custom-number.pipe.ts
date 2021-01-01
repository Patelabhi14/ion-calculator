import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customNumber',
})
export class CustomNumberPipe implements PipeTransform {
	transform(value: string, operator: string): string {
		if (
			operator === '+' ||
			operator === '-' ||
			operator === 'x' ||
			operator === '/' ||
			operator === '=' ||
			operator === 'ac' ||
			operator === 'c'
		) {
			value = value.replace(operator, ' ' + operator + ' ');
		}
		return value;
	}
}
