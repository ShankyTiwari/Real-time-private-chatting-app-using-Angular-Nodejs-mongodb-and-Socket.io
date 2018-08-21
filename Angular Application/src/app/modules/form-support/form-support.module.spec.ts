import { FormSupportModule } from './form-support.module';

describe('FormSupportModule', () => {
	let formSupportModule: FormSupportModule;

	beforeEach(() => {
		formSupportModule = new FormSupportModule();
	});

	it('should create an instance', () => {
		expect(formSupportModule).toBeTruthy();
	});
});
