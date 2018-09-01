import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSupportModule } from './../../../modules/form-support/form-support.module';

import { ConversationComponent } from './conversation.component';

@NgModule({
	imports: [
		CommonModule,
		FormSupportModule
	],
	declarations: [ConversationComponent],
	exports: [
		ConversationComponent
	]
})
export class ConversationModule { }
