import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/* Importing components starts*/
import { ChatListComponent } from '../chat-list/chat-list.component';
import { ConversationComponent } from '../conversation/conversation.component';
/* Importing components starts*/

/* Importing services starts*/
import { SocketService } from './../../services/socket.service';
/* Importing services ends*/

/* importing interfaces starts */
import { Auth } from './../../interfaces/auth';
import { ChatListResponse } from './../../interfaces/chat-list-response';
/* importing interfaces ends */

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	private userId: string = null;
	private username: string = null;
	private overlayDisplay = true;

	private conversation = 'CONVERSATION';
	private selectedUserInfo = 'SELECTEDUSERINFO';

	@ViewChild(ChatListComponent) chatListComponent: ChatListComponent;
	@ViewChild(ConversationComponent) conversationComponent: ConversationComponent;

	constructor(
		private socketService: SocketService,
		private router: Router
	) { }

	ngOnInit() {
		/* getting userID and Username from Local Storage */
		this.userId = localStorage.getItem('userid');
		this.username = localStorage.getItem('username');

		if (this.userId === '' || typeof this.userId === 'undefined' || this.userId === null ) {
			this.router.navigate(['/']);
		} else {
			/* making socket connection by passing UserId. */
			this.socketService.connectSocket(this.userId);

			/* calling getChatList() service method to get the chat list. */
			this.socketService.getChatList(this.userId).subscribe((chatListResponse: ChatListResponse) => {
				this.overlayDisplay = false;
				this.chatListComponent.getChatList(chatListResponse, this.userId);
			});
			/* Calling Compoenent method to Listen for Incoming Messages*/
			this.conversationComponent.listenForMessages(this.userId);
		}
	}

	logout() {
		this.socketService.logout({ userId: this.userId }).subscribe((response: Auth) => {
			localStorage.removeItem('userid');
			localStorage.removeItem('username');
			this.router.navigate(['/']); /* Home page redirection */
		});
	}

}
