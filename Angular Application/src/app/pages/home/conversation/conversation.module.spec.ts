import { ConversationModule } from './conversation.module';

describe('ConversationModule', () => {
	let conversationModule: ConversationModule;

	beforeEach(() => {
		conversationModule = new ConversationModule();
	});

	it('should create an instance', () => {
		expect(conversationModule).toBeTruthy();
	});
});
