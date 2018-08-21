import { TestBed, inject } from '@angular/core/testing';

import { DataShareService } from './data-share.service';

describe('DataShareService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DataShareService]
		});
	});

	it('should be created', inject([DataShareService], (service: DataShareService) => {
		expect(service).toBeTruthy();
	}));
});
