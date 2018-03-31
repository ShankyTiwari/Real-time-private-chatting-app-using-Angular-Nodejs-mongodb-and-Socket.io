import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

/* Importing services starts*/
import { ChatService } from './../../services/chat.service';
import { SocketService } from './../../services/socket.service';
import { EmitterService } from './../../services/emitter.service';
import { FormService } from './../../services/form.service';
/* Importing services ends*/

/* importing interfaces starts */
import { MessagesResponse } from './../../interfaces/messages-response';
import { Messages } from './../../interfaces/messages';
import { SelectedUser} from './../../interfaces/selected-user';
/* importing interfaces ends */

@Component({
	selector: 'app-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnChanges {

	private messageForm: FormGroup;

	private userId: string = null;
	private messages: Messages[] = [];
	private selectedUser: SelectedUser = null;
	private messageLoading = true;

	/* Incoming data from other component starts */
	@Input() conversation: string;
	@Input() selectedUserInfo: string;
	/* Incoming data from other component ends */

	constructor(
		private router: Router,
		private chatService: ChatService,
		private socketService: SocketService,
		private formService: FormService
	) {
		this.messageForm = this.formService.createMessageForm();
	}

	listenForMessages(userId: string): void {
		this.userId = userId;
		this.socketService.receiveMessages().subscribe((message: Messages) => {
			/* subscribing for messages statrts */
			if (this.selectedUser !== null && this.selectedUser.id === message.fromUserId) {
				this.messages = [...this.messages, message];
				setTimeout(() => {
					document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
				}, 100);
			}
		});
	}

	sendMessage(event) {
		if (event.keyCode === 13) {
			const message = this.messageForm.controls['message'].value.trim();
			if (message === '' || message === undefined || message === null) {
				alert(`Message can't be empty.`);
			} else if (this.userId === '') {
				this.router.navigate(['/']);
			} else if (this.selectedUser.id === '') {
				alert(`Select a user to chat.`);
			} else {
				const data: Messages = {
					fromUserId: this.userId,
					message: (message).trim(),
					toUserId: this.selectedUser.id,
				};
				this.messages = [...this.messages, data];
				/* calling method to send the messages */
				this.socketService.sendMessage({
					fromUserId: this.userId,
					message: (message).trim(),
					toUserId: this.selectedUser.id
				});
				this.messageForm.reset();
				setTimeout(() => {
					document.querySelector(`.message-thread`).scrollTop = document.querySelector(`.message-thread`).scrollHeight;
				}, 100);
			}
		}
	}

	alignMessage(userId: string): boolean {
		return this.userId === userId ? false : true;
	}

	ngOnChanges(changes: any) {
		/* Fetching selected users information from other component. */
		EmitterService.get(this.selectedUserInfo).subscribe((selectedUser: SelectedUser) => {
			this.selectedUser = selectedUser;
		});
		/* Fetching conversation data between two users from other component. */
		EmitterService.get(this.conversation).subscribe((data: MessagesResponse ) => {
			this.messageLoading = false;
			this.messages = data.messages;
		});
	}
}
