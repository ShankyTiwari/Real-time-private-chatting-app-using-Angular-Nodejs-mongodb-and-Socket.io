import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Importing services starts*/
import { SocketService } from './../../services/socket/socket.service';
import { ChatService } from './../../services/chat/chat.service';
import { DataShareService } from './../../services/utils/data-share.service';
/* Importing services ends*/

/* importing interfaces starts */
import { Auth } from './../../interfaces/auth';
/* importing interfaces ends */

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public userId: string = null;
	public username: string = null;
	public overlayDisplay = true;

	constructor(
		private chatService: ChatService,
		private socketService: SocketService,
		private dataShareService: DataShareService,
		private router: Router
	) { }

	ngOnInit() {
		this.userId = this.dataShareService.getUserId();
		this.username = this.dataShareService.getUserName();
		this.establishSocketConnection();
	}

	async establishSocketConnection() {
		try {
			if (this.userId === '' || typeof this.userId === 'undefined' || this.userId === null) {
				this.router.navigate(['/']);
			} else {
				/* making socket connection by passing UserId. */
				await this.socketService.connectSocket(this.userId);
				this.overlayDisplay = false;
			}
		} catch (error) {
			alert('Something went wrong');
		}
	}

	logout() {
		this.chatService.removeLS()
			.then((removedLs: boolean) => {
				this.socketService.logout({ userId: this.userId }).subscribe((response: Auth) => {
					this.router.navigate(['/']);
				});
			})
			.catch((error: Error) => {
				alert(' This App is Broken, we are working on it. try after some time.');
				throw error;
			});
	}
}
