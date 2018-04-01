import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

/* Importing services starts*/
import { ChatService } from './../../services/chat.service';
import { SocketService } from './../../services/socket.service';
import { EmitterService } from './../../services/emitter.service';
/* Importing services ends*/

/* importing interfaces starts */
import { SelectedUser } from './../../interfaces/selected-user';
import { ChatListResponse } from './../../interfaces/chat-list-response';
import { MessagesResponse } from './../../interfaces/messages-response';
/* importing interfaces ends */

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {

	private userId: string = null;
	public chatListUsers: SelectedUser[] = [];
	private selectedUserId: string = null;

	/* Incoming data from other component starts */
	@Input() conversation: string;
	@Input() selectedUserInfo: string;
	/* Incoming data from other component ends */

	constructor(
		private chatService: ChatService,
		private socketService: SocketService,
		private router: Router
	) { }

	getChatList(socketIOResponse: ChatListResponse, userId: string): void {
		this.userId = userId;
		if (!socketIOResponse.error) {
			if (socketIOResponse.singleUser) {
				if (this.chatListUsers.length > 0) {
					this.chatListUsers = this.chatListUsers.filter(function (obj: SelectedUser) {
						return obj.id !== socketIOResponse.chatList[0].id;
					});
				}
				/* Adding new online user into chat list array */
				this.chatListUsers = this.chatListUsers.concat(socketIOResponse.chatList);
			} else if (socketIOResponse.userDisconnected) {
				const loggedOutUser = this.chatListUsers.findIndex((obj: SelectedUser) => obj.id === socketIOResponse.userid );
				if (loggedOutUser >= 0) {
					this.chatListUsers[loggedOutUser].online = 'N';
				}
			} else {
				/* Updating entire chatlist if user logs in. */
				this.chatListUsers = socketIOResponse.chatList;
			}
		} else {
			alert(`Unable to load Chat list, Redirecting to Login.`);
			this.chatService.removeLS()
			.then( (removedLs: boolean) => {
				this.router.navigate(['/']);
			})
			.catch((error: Error) => {
				alert(' This App is Broken, we are working on it. try after some time.');
				throw error;
			});
		}
	}


	isUserSelected(userId: string): boolean {
		if (!this.selectedUserId) {
			return false;
		}
		return this.selectedUserId === userId ? true : false;
	}

	/*
	* Method to select the user from the Chat list starts
	*/
	selectedUser(user: SelectedUser): void {
		this.selectedUserId = user.id;

		/* Sending selected users information to other component. */
		EmitterService.get(this.selectedUserInfo).emit(user);

		/* calling method to get the messages */
		this.chatService.getMessages({ userId: this.userId, toUserId: user.id }).subscribe((response: MessagesResponse) => {
			/* Sending conversation between two users to other component. */
			EmitterService.get(this.conversation).emit(response);
		});
	}
}
