import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

/* Importing services starts*/
import { ChatService } from './../../services/chat.service';
import { FormService } from './../../services/form.service';
/* Importing services ends*/

/* Importing inrerface starts*/
import { UsernameAvailable } from './../../interfaces/username-available';
/* Importing inrerface starts*/

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

	private setTabPosition = 'center';
	private overlayDisplay = false;
	private isuserNameAvailable = false;

	private loginForm: FormGroup;
	private registrationForm: FormGroup;

	constructor(
		private router: Router,
		private chatService: ChatService,
		private formService: FormService
	) {
		this.loginForm = this.formService.createLoginForm();
		this.registrationForm = this.formService.createRegistrationForm();
	 }

	ngOnInit() {
		if (this.chatService.userSessionCheck()) {
			this.overlayDisplay = true;
			this.router.navigate(['/home']);
		} else {
			this.overlayDisplay = false;
			this.getUsernameSuggestion();
		}
	}

	login(): void {
		if (this.loginForm.valid) {
			this.overlayDisplay = false;
			this.chatService.login(this.loginForm.value).subscribe(response => {
				localStorage.setItem('userid', response.userId);
				this.router.navigate(['/home']);
			});
		}
	}

	register(): void {
		if (this.registrationForm.valid) {
			this.overlayDisplay = false;
			this.chatService.register(this.registrationForm.value).subscribe(response => {
				localStorage.setItem('userid', response.userId);
				this.router.navigate(['/home']);
			});
		}
	}

	getUsernameSuggestion(): void {
		this.registrationForm.controls['username'].valueChanges
			.debounceTime(800)
			.distinctUntilChanged()
			.subscribe( (term: string) => {
				if (term !== '' ) {
					this.chatService.usernameAvailable(term).subscribe((response: UsernameAvailable) => {
						if (response.error) {
							this.isuserNameAvailable = true;
						} else {
							this.isuserNameAvailable = false;
						}
					});
				}
			});
	}

}
