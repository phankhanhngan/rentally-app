import { logOut, setCredentials } from '../redux/features/auth/authSlice';
import type { RootState } from '../redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:3500',
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.accessToken;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 403) {
		console.log('sending refresh token');
		// send refresh token to get a new access token
		const refreshResult = await baseQuery('/refresh', api, extraOptions);
		console.log(refreshResult);
		if (refreshResult?.data) {
			const user = (api.getState() as RootState).auth.user;
			const accessToken = (api.getState() as RootState).auth.accessToken;

			// store the new token
			api.dispatch(
				setCredentials({
					...refreshResult.data,
					user,
					accessToken,
				}),
			);
			// retry the original query with the new access token
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
});
