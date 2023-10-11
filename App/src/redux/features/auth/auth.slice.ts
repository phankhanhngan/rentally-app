import type { IAuth } from '@/interfaces/auth.interface';
import type { IUser } from '@/interfaces/user.interface';
import { getData, storeData } from '@/utils/helpers/asyncStorage';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

const initialState: IAuth = {
	accessToken: null,
	userInfo: null,
};

// Thunk action to initialize the state
export const initializeState = () => async (dispatch: any) => {
	try {
		const token = await getData('jwt');
		console.log(token);
		// const decodedToken = jwt(token || '') as IUser;
		dispatch(setCredentials({ accessToken: token || null }));
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
			state.userInfo = jwt(accessToken as string);
			storeData('jwt', accessToken as string).catch((error) => {
				console.error('Error storing data:', error);
			});
		},

		logOut: (state) => {
			console.log('222');
			state.accessToken = null;
			state.userInfo = null;
			storeData('jwt', '').catch((error) => {
				console.error('Error clearing data:', error);
			});
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: IAuth }) =>
	state.auth.accessToken;
