import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CustomNumberPipe } from './custom-number.pipe';
import { PopoverComponent } from '../popover/popover.component';
import { HistoryComponent } from '../history/history.component';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
	declarations: [
		HomePage,
		CustomNumberPipe,
		PopoverComponent,
		HistoryComponent,
	],
})
export class HomePageModule {}
