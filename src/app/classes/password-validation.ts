import { FormControl, Validators } from '@angular/forms';

export class PasswordValidation {
	constructor() {
		return new FormControl('',
			Validators.compose(
				[
					Validators.required,
					Validators.minLength(5)
				],
			)
		);
	}
}
