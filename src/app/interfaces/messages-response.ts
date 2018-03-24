import { Messages } from './messages';

export interface MessagesResponse {
	error: boolean;
	messages: Messages[];
}
