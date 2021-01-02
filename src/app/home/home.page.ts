import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { PopoverController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

import { evaluate } from 'mathjs';

import { PopoverComponent } from '../popover/popover.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	expression: string = '';
	result: string = '';
	lastOp: string;
	calculations: Calculation[] = [];
	isPortrait: boolean = true;

	constructor(
		private screen: ScreenOrientation,
		private popOverCtrl: PopoverController
	) {}

	ngOnInit() {
		this.onToggleLight();
		this.screen.onChange().subscribe(() => {
			if (this.screen.type === 'portrait-primary') this.isPortrait = true;
			else if (this.screen.type === 'landscape-primary')
				this.isPortrait = false;
		});
	}

	onButtonPress(symbol) {
		if (typeof symbol === 'number') {
			this.expression += `${symbol}`;
		} else if (symbol === '=') {
			let tempExpression = this.expression.replace('x', '*');
			try {
				this.result = evaluate(tempExpression);
				this.calculations.push({
					expression: this.expression,
					result: this.result,
				});
				const calculations = JSON.stringify(this.calculations);
				Plugins.Storage.set({ key: 'calculations', value: calculations });
			} catch (error) {
				this.result = 'Invalid';
			}
		} else if (symbol === 'per') {
			const splitExp = this.expression.split(this.lastOp);
			this.expression =
				splitExp.length <= 1
					? `${this.percent(splitExp[splitExp.length - 1])}`
					: splitExp[splitExp.length - 2] +
					  this.lastOp +
					  `${this.percent(splitExp[splitExp.length - 1])}`;
		} else if (
			symbol === '+' ||
			symbol === '-' ||
			symbol === 'x' ||
			symbol === '/'
		) {
			this.expression += symbol;
			this.lastOp = symbol;
		} else if (symbol === 'ac') {
			this.result = '';
			this.expression = '';
		} else if (symbol === 'c') {
			this.expression = this.expression.substr(0, this.expression.length - 1);
		} else if (symbol === '.') {
			this.expression += symbol;
		} else if (symbol === 'pm') {
			const splitExp = this.expression.split(this.lastOp);
			this.expression =
				splitExp.length <= 1
					? `${this.sign(splitExp[splitExp.length - 1])}`
					: splitExp[splitExp.length - 2] +
					  this.lastOp +
					  `${this.sign(splitExp[splitExp.length - 1])}`;
		}
	}

	percent(num) {
		return num / 100;
	}

	sign(value) {
		let sign;
		if (Math.sign(parseInt(value, 0)) === 1) {
			sign = -Math.abs(parseInt(value, 0));
		} else if (Math.sign(parseInt(value, 0)) === -1) {
			sign = Math.abs(parseInt(value, 0));
		}
		return sign;
	}

	onToggleDark() {
		document.body.classList.toggle('dark', true);
	}

	onToggleLight() {
		document.body.classList.toggle('dark', false);
	}

	onShowHistory(ev) {
		this.popOverCtrl
			.create({
				component: PopoverComponent,
				event: ev,
				translucent: true,
			})
			.then((popOverEl) => {
				popOverEl.present();
			});
	}
}
