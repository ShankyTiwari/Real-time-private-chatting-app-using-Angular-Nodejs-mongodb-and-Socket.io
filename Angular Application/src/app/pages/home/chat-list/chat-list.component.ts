import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Importing services starts*/
import { ChatService } from './../../../services/chat/chat.service';
import { SocketService } from './../../../services/socket/socket.service';
import { DataShareService } from './../../../services/utils/data-share.service';

/* importing interfaces starts */
import { User } from './../../../interfaces/user';
import { ChatListResponse } from './../../../interfaces/chat-list-response';

@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.component.html',
	styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
	loading = true;
	userId: string = null;
	selectedUserId: string = null;
	chatListUsers: User[] = [];

	constructor(
		private chatService: ChatService,
		private socketService: SocketService,
		private router: Router,
		private dataShareService: DataShareService
	) { }

	ngOnInit() {
		this.loading = true;
		this.userId = this.dataShareService.getUserId();
		this.socketService.getChatList(this.userId).subscribe((chatListResponse: ChatListResponse) => {
			this.renderChatList(chatListResponse);
		});
	}

	renderChatList(chatListResponse: ChatListResponse): void {
		if (!chatListResponse.error) {
			if (chatListResponse.singleUser) {
				if (this.chatListUsers.length > 0) {
					this.chatListUsers = this.chatListUsers.filter(function (obj: User) {
						return obj.id !== chatListResponse.chatList[0].id;
					});
				}
				/* Adding new online user into chat list array */
				this.chatListUsers = this.chatListUsers.concat(chatListResponse.chatList);
			} else if (chatListResponse.userDisconnected) {
				const loggedOutUser = this.chatListUsers.findIndex((obj: User) => obj.id === chatListResponse.userid);
				if (loggedOutUser >= 0) {
					this.chatListUsers[loggedOutUser].online = 'N';
				}
			} else {
				/* Updating entire chatlist if user logs in. */
				this.chatListUsers = chatListResponse.chatList;
			}
			this.loading = false;
		} else {
			alert(`Unable to load Chat list, Redirecting to Login.`);
			this.chatService.removeLS()
				.then(async (removedLs: boolean) => {
					await this.router.navigate(['/']);
					this.loading = false;
				})
				.catch(async (error: Error) => {
					alert(' This App is Broken, we are working on it. try after some time.');
					await this.router.navigate(['/']);
					console.warn(error);
					this.loading = false;
				});
		}
	}

	isUserSelected(userId: string): boolean {
		if (!this.selectedUserId) {
			return false;
		}
		return this.selectedUserId === userId ? true : false;
	}

	selectedUser(user: User): void {
		this.selectedUserId = user.id;
		this.dataShareService.changeSelectedUser(user);
	}
}
