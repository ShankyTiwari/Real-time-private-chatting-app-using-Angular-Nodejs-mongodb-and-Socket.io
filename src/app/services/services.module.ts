/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Importing services starts
 */

import { FormService } from './form.service';
import { ChatService } from './chat.service';
import { AuthGuardService } from './auth-guard.service';
import { SocketService } from './socket.service';
import { EmitterService } from './emitter.service';
/**
 * Importing services ends
 */

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [ /* Adding services into providers array*/
		ChatService,
		SocketService,
		AuthGuardService,
		EmitterService,
		FormService
	]
})
export class ServicesModule { }
