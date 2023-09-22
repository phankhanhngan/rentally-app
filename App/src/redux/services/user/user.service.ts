import { IUser } from "@/interfaces/user.interface";
import { creatApiWithAuth } from '../apiWithAuth.service';

const creatApiUserWithAuth = creatApiWithAuth('userApi', ['Users'])
export const userApi = creatApiUserWithAuth.injectEndpoints({
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
    useDeleteUserMutation,
} = userApi;

