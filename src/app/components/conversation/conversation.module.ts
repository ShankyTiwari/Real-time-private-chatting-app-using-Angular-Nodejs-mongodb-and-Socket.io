import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConversationComponent } from './conversation.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	declarations: [ConversationComponent],
	exports: [
		ConversationComponent
	]
})
export class ConversationModule { }
