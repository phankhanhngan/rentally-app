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
