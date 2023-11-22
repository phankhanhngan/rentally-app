import { createApiWithAuth } from '../apiWithAuth.service';
import type { IDisableAccount, IUpdatePassword, IUpdateProfile, IUpdateResponse, IUser } from '@/interfaces/user.interface';

const createApiUserWithAuth = createApiWithAuth('userApi', ['Users']);
export const userApi = createApiUserWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<IUser[], number | void>({
			query(limit = 10) {
				return `/users?limit=${limit}`;
			},
		}),
		getUserById: builder.query<IUser, number>({
			query: (id) => `/users/${id}`,
		}),
		createUser: builder.mutation<IUser, Partial<IUser>>({
			query: (body) => ({
				url: `/users`,
				method: 'POST',
				body,
			}),
		}),
		updateUser: builder.mutation<IUser, Partial<IUser>>({
			query: ({ id, ...patch }) => ({
				url: `/users/${id}`,
				method: 'PATCH',

				body: patch,
			}),
		}),
		updateProfile: builder.mutation<IUpdateResponse, FormData>({
			query: (formData) => ({
				url: `/users/me`,
				method: 'PUT',

				body: formData,
			}),
		}),
		updatePassword: builder.mutation<IUpdateResponse, IUpdatePassword>({
			query: ({...patch }) => ({
				url: `/users/me/password`,
				method: 'PUT',

				body: patch,
			}),
		}),
		disableAccount: builder.mutation<IUpdateResponse, IDisableAccount>({
			query: ({...patch }) => ({
				url: `/users/me/disable`,
				method: 'DELETE',

				body: patch,
			}),
		}),
		deleteUser: builder.mutation<void, number>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserByIdQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useUpdateProfileMutation,
	useUpdatePasswordMutation,
	useDisableAccountMutation,
	useDeleteUserMutation,
} = userApi;
