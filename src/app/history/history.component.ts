import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
	calculations: Calculation[];

	constructor(private modalCtrl: ModalController) {}

	ngOnInit() {
		Plugins.Storage.get({ key: 'calculations' }).then((calculations) => {
			this.calculations = JSON.parse(calculations.value);
		});
	}

	onClose() {
		this.modalCtrl.dismiss();
	}
}
