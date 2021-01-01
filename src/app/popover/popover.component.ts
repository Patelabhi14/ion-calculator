import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { HistoryComponent } from '../history/history.component';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
	constructor(
		private popOverCtrl: PopoverController,
		private modalCtrl: ModalController
	) {}

	ngOnInit() {}

	onClickHistory() {
		this.popOverCtrl.dismiss();
		this.modalCtrl.create({ component: HistoryComponent }).then((modalEl) => {
			modalEl.present();
		});
	}
}
