import { Validators } from '@angular/forms';

export class PasswordValidation {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.required,
					Validators.minLength(5)
				],
			),
		];
	}
}
