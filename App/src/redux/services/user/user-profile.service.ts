import { creatApiWithAuth } from '../apiWithAuth.service';
import type { IUser } from '@/interfaces/user.interface';

const creatApiUserWithAuth = creatApiWithAuth('userApi', ['Users']);
export const userApi = creatApiUserWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		updateMe: builder.mutation<IUser, Partial<IUser>>({
			query: ({ ...put }) => ({
				url: `/users/me`,
				method: 'PUT',
				body: put,
			}),
		}),
	}),
});

export const { useUpdateMeMutation } = userApi;
