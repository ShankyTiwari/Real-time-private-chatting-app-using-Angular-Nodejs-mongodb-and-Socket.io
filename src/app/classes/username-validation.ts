import { Validators } from '@angular/forms';

export class UsernameValidation {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.required,
				],
			),
		];
	}
}
