import { UISupportModule } from './ui-support.module';

describe('UISupportModule', () => {
	let uISupportModule: UISupportModule;

	beforeEach(() => {
		uISupportModule = new UISupportModule();
	});

	it('should create an instance', () => {
		expect(uISupportModule).toBeTruthy();
	});
});
