import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UsernameValidation } from './../classes/username-validation';
import { PasswordValidation } from './../classes/password-validation';
import { MessageValidation } from './../classes/message-validation';

@Injectable()
export class FormService {
	constructor() {}

	createLoginForm(): FormGroup {
		return new FormBuilder().group({
			username: new UsernameValidation(),
			password: new PasswordValidation(),
		});
	}

	createRegistrationForm(): FormGroup {
		return new FormBuilder().group({
			username: new UsernameValidation(),
			password: new PasswordValidation(),
		});
	}

	createMessageForm(): FormGroup {
		return new FormBuilder().group({
			message: new MessageValidation
		});
	}
}
