import { FormControl, Validators } from '@angular/forms';

export class MessageValidation {
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
