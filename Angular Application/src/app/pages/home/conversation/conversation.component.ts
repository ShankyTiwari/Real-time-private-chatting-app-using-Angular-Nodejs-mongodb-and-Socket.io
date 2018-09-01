import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

/* Importing services starts*/
import { ChatService } from './../../../services/chat/chat.service';
import { SocketService } from './../../../services/socket/socket.service';
import { FormService } from './../../../services/form/form.service';
import { DataShareService } from './../../../services/utils/data-share.service';
/* Importing services ends*/

/* importing interfaces starts */
import { MessagesResponse } from './../../../interfaces/messages-response';
import { Message } from './../../../interfaces/message';
import { User } from './../../../interfaces/user';
/* importing interfaces ends */

@Component({
	selector: 'app-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
	public messageLoading = true;
	private userId: string = null;
	public selectedUser: User = null;
	public messages: Message[] = [];
	public messageForm: FormGroup;
	@ViewChild('messageThread') private messageContainer: ElementRef;

	constructor(
		private router: Router,
		private chatService: ChatService,
		private socketService: SocketService,
		private formService: FormService,
		private dataShareService: DataShareService
	) {
		this.messageForm = this.formService.createMessageForm();
	}

	ngOnInit() {
		this.userId = this.dataShareService.getUserId();
		this.listenForMessages();
		this.dataShareService.selectedUser.subscribe( (selectedUser: User) => {
			if (selectedUser !== null) {
				this.selectedUser = selectedUser;
				this.getMessages(this.selectedUser.id);
			}
		});
	}

	getMessages(toUserId: string) {
		this.messageLoading = true;
		this.chatService.getMessages({ userId: this.userId, toUserId: toUserId }).subscribe((response: MessagesResponse) => {
			this.messages = response.messages;
			this.messageLoading =  false;
		});
	}

	listenForMessages(): void {
		this.socketService.receiveMessages().subscribe((socketResponse: Message) => {
			if (this.selectedUser !== null && this.selectedUser.id === socketResponse.fromUserId) {
				this.messages = [...this.messages, socketResponse];
				this.scrollMessageContainer();
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
				this.sendAndUpdateMessages({
					fromUserId: this.userId,
					message: (message).trim(),
					toUserId: this.selectedUser.id,
				});
			}
		}
	}

	sendAndUpdateMessages(message: Message) {
		try {
			this.messageForm.disable();
			this.socketService.sendMessage(message);
			this.messages = [...this.messages, message];
			this.messageForm.reset();
			this.messageForm.enable();
			this.scrollMessageContainer();
		} catch (error) {
			console.warn(error);
			alert(`Can't send your message`);
		}
	}

	scrollMessageContainer(): void {
		if (this.messageContainer !== undefined) {
			try {
				setTimeout(() => {
					this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
				}, 100);
			} catch (error) {
				console.warn(error);
			}
		}
	}

	alignMessage(userId: string): boolean {
		return this.userId === userId ? false : true;
	}
}
