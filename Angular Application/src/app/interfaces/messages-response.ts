import { Message } from './message';

export interface MessagesResponse {
	error: boolean;
	messages: Message[];
}
