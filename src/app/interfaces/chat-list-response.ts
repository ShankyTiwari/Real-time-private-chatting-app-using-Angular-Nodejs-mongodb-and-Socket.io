import { SelectedUser } from './selected-user';

export interface ChatListResponse {
	chatList: Array<SelectedUser>;
	error: boolean;
	singleUser: boolean;
	userDisconnected: boolean;
	userid: string;
}
