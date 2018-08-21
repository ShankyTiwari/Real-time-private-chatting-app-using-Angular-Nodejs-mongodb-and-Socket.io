import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UISupportModule } from './../../modules/ui-support/ui-support.module';
import { FormSupportModule } from './../../modules/form-support/form-support.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ConversationModule } from './conversation/conversation.module';
import { ChatListModule } from './chat-list/chat-list.module';

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		UISupportModule,
		FormSupportModule,
		ConversationModule,
		ChatListModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
