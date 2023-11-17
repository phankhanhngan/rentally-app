export interface IUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	photo: string;
	role: string;
	googleId?: string;
	status?: string;
}

export interface ILandlord {
	id: number;
	name: string;
	phoneNumber: string;
	email?: string;
	photo: string;
	deletedAt?: string | null;
}

export interface IUserQuery {
	keyword: string;
}

export interface IUsersResponse {
	data: any;
	message: string;
	status: string;
}

export type ICreateUserRequest = FormData;
export interface IUpdateUserRequest {
	id: number;
	formData: FormData;
}

export interface IDisableUserRequest {
	id: number;
	status: string;
}

export type IDeleteUserRequest = Pick<IUser, 'id'>;
