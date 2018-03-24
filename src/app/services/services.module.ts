import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatService } from './chat.service';
import { SocketService } from './socket.service';
import { AuthGuardService } from './auth-guard.service';
import { EmitterService } from './emitter.service';
import { FormService } from './form.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		ChatService,
		SocketService,
		AuthGuardService,
		EmitterService,
		FormService
	]
})
export class ServicesModule { }
