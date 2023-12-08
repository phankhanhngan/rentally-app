import type { IAuth } from '@/interfaces/auth.interface';
import type { IUser } from '@/interfaces/user.interface';
import { getData, removeData, storeData } from '@/utils/helpers/asyncStorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

const initialState: IAuth = {
	accessToken: null,
	userInfo: null,
};
export const initializeState = () => async (dispatch: any) => {
	try {
		const token = await getData('jwt');
		if (token) dispatch(setCredentials({ accessToken: token }));
	} catch (error) {
		console.error('Error initializing state:', error);
	}
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{ accessToken: string | null }>,
		) => {
			const { accessToken } = action.payload;
			state.accessToken = accessToken;
			if (accessToken) {
				state.userInfo = jwt(accessToken) as IUser;
			}
			storeData('jwt', accessToken as string);
		},

		logOut: (state) => {
			state.accessToken = null;
			state.userInfo = null;
			removeData('jwt');
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice;

export const selectCurrentToken = (state: { auth: IAuth }) =>
	state.auth.accessToken;
