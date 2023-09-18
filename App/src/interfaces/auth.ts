import type { IUser } from './user';

export interface IAuth {
	accessToken: null | string;
	user: null | IUser;
}
