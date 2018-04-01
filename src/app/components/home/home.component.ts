import { Component, OnInit, ViewChild } from '@angular/core';

/* Importing components starts*/
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ConversationComponent } from '../conversation/conversation.component';
/* Importing components starts*/

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor() {	 }

	ngOnInit() { }

}
