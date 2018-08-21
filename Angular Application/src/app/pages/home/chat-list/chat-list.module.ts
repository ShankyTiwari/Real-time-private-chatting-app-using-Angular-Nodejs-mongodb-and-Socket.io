import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ChatListComponent],
	exports: [
		ChatListComponent
	]
})
export class ChatListModule { }
