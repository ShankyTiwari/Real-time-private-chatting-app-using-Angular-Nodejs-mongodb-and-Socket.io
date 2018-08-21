import { Validators } from '@angular/forms';

export class UsernameValidator {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.required
				],
			),
		];
	}
}
