import { Validators } from '@angular/forms';

export class MessageValidator {
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
