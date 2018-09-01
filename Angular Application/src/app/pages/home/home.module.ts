/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UISupportModule } from './../../modules/ui-support/ui-support.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ConversationModule } from './conversation/conversation.module';
import { ChatListModule } from './chat-list/chat-list.module';

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		UISupportModule,
		ConversationModule,
		ChatListModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
