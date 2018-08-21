import { User } from './user';

export interface ChatListResponse {
	chatList: User[];
	error: boolean;
	singleUser: boolean;
	userDisconnected: boolean;
	userid: string;
}
