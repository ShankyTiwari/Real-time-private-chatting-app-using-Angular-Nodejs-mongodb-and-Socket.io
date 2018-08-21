import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
	public userId: string = null;
	public userName: string = null;
	private user = new BehaviorSubject(null);
	selectedUser: Observable<User> = this.user.asObservable();

	constructor() { }

	changeSelectedUser(message: User) {
		this.user.next(message);
	}

	getUserId(): string {
		if (this.userId  === null) {
			this.userId = localStorage.getItem('userid');
		}
		return this.userId;
	}

	getUserName(): string {
		if (this.userName === null) {
			this.userName = localStorage.getItem('username');
		}
		return this.userName;
	}
}
