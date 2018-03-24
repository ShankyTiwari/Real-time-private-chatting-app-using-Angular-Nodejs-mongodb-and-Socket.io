import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChatListModule } from './../chat-list/chat-list.module';
import { ConversationModule } from './../conversation/conversation.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		NgbModule.forRoot(),
		ChatListModule,
		ConversationModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
