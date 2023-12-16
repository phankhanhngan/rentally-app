import { logOutThunk, setCredentialsThunk } from './authThunk';
import type { IAuth } from '@/interfaces/auth.interface';
import type { IUser } from '@/interfaces/user.interface';
import { getData } from '@/utils/helpers/asyncStorage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';
const initialState: IAuth = {
	accessToken: null,
	userInfo: null,
};
export const initializeState = () => async (dispatch: any) => {
	try {
		const token = await getData('jwt');
		console.log(token);
		if (token) dispatch(setCredentials({ accessToken: token }));
	} catch (error) {
		console.error('Error initializing state:', error);
	}
};

export const setCredentials = createAsyncThunk(
	'Auth/setCredentials',
	setCredentialsThunk,
);
export const logOut = createAsyncThunk('Auth/logOut', logOutThunk);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(setCredentials.pending, () => {
			console.log('pending');
		});
		builder.addCase(setCredentials.rejected, () => {
			console.log('Rejected');
		});
		builder.addCase(setCredentials.fulfilled, (state, { payload }) => {
			state.accessToken = payload;
			if (payload) {
				state.userInfo = jwt(payload) as IUser;
			}
		});
		builder.addCase(logOut.pending, () => {
			console.log('pending');
		});
		builder.addCase(logOut.rejected, () => {
			console.log('Rejected');
		});
		builder.addCase(logOut.fulfilled, (state) => {
			console.log('fulfilled');
			state.accessToken = null;
			state.userInfo = null;
		});
	},
});

export default authSlice;

export const selectCurrentToken = (state: { auth: IAuth }) =>
	state.auth.accessToken;
