// import { logOut, setCredentials } from "../features/auth/auth.slice"
import type { RootState } from '@/redux/store';
import { BASE_URL } from '@env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// type BaseQueryWithReauthArgs = Parameters<BaseQueryFn>

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	// credentials: 'include',
	mode: 'cors',

	prepareHeaders: (headers, { getState }) => {
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
		const token = (getState() as RootState).auth.accessToken;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

// const baseQueryWithReAuth = async (
//     args: BaseQueryWithReauthArgs[0],
//     api: BaseQueryWithReauthArgs[1],
//     extraOptions: BaseQueryWithReauthArgs[2]
// ) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.status === 403) {
//         console.log("sending refresh token")
//         // send refresh token to get a new access token
//         const refreshResult = await baseQuery("/refresh", api, extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const accessToken = (api.getState() as RootState).auth.accessToken
//             // store the new token
//             api.dispatch(
//                 setCredentials({
//                     ...refreshResult.data,
//                     accessToken
//                 })
//             )
//             // retry the original query with the new access token
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logOut())
//         }
//     }

//     return result
// }

export const createApiWithAuth = (
	reducerPath: string,
	tagTypes: Array<string>,
) =>
	createApi({
		baseQuery: baseQuery,
		endpoints: () => ({}),
		reducerPath: reducerPath,
		tagTypes: tagTypes,
	});
