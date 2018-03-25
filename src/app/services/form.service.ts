import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsernameValidation } from './../classes/username-validation';
import { PasswordValidation } from './../classes/password-validation';
import { MessageValidation } from './../classes/message-validation';

@Injectable()
export class FormService {
	constructor() {}

	createLoginForm(): FormGroup {
		return new FormGroup({
				username: new FormControl('', [
					Validators.required,
				],
			),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(5)
				],
			)
		});
	}

	createRegistrationForm(): FormGroup {
		return new FormGroup({
				username: new FormControl('', [
					Validators.required,
				],
			),
				password: new FormControl('', [
					Validators.required,
					Validators.minLength(5)
				],
			)
		});
	}

	createMessageForm(): FormGroup {
		return new FormGroup({
				message: new FormControl('', [
					Validators.required,
				],
			)
		});
	}
}
