import { FormControl, Validators } from '@angular/forms';

export class UsernameValidation {
	constructor() {
		return new FormControl('',
			Validators.compose(
				[
					Validators.required,
				],
			)
		);
	}
}
