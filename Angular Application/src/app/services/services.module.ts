import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormService } from './form/form.service';
import { ChatService } from './chat/chat.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { SocketService } from './socket/socket.service';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [],
	providers: [
		FormService,
		ChatService,
		AuthGuardService,
		SocketService
	]
})
export class ServicesModule { }
