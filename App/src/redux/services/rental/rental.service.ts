import { createApiWithAuth } from '../apiWithAuth.service';
import type {
	IMyRental,
	IRental,
	IRentalResponse,
} from '@/interfaces/rental.interface';

const createApiRentalWithAuth = createApiWithAuth('rentalApi', ['Rental']);

export const rentalApi = createApiRentalWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getMyRental: builder.query<
			{
				message: string;
				success: boolean;
				data: IMyRental[];
			},
			string
		>({
			query: () => {
				return {
					url: '/rental/my-rental',
				};
			},
			providesTags: ['Rental'],
		}),
		createRental: builder.mutation<IRentalResponse, { data: IRental }>({
			query: ({ data }) => ({
				url: `/rental`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Rental'],
		}),
		retalRequest: builder.mutation<
			{ success: boolean; message: string },
			{ id: string; type: string }
		>({
			query: ({ id, type }) => ({
				url: `/rental/my-rental/${id}/${type}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Rental'],
		}),
	}),
});

export const {
	useCreateRentalMutation,
	useRetalRequestMutation,
	useGetMyRentalQuery,
} = rentalApi;
