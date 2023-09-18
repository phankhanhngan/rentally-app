import type { IAuth } from '../../../interfaces/auth';
import type { IUser } from '../../../interfaces/user';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAuth = {
	user: null,
	accessToken: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{
				user: IUser | null;
				accessToken: string | null;
			}>,
		) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.accessToken = accessToken;
		},

		logOut: (state) => {
			state.user = null;
			state.accessToken = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice;

export const selectCurrentUser = (state: { auth: IAuth }) => state.auth.user;
export const selectCurrentToken = (state: { auth: IAuth }) =>
	state.auth.accessToken;
