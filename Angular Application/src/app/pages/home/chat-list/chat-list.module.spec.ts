import { ChatListModule } from './chat-list.module';

describe('ChatListModule', () => {
	let chatListModule: ChatListModule;

	beforeEach(() => {
		chatListModule = new ChatListModule();
	});

	it('should create an instance', () => {
		expect(chatListModule).toBeTruthy();
	});
});
