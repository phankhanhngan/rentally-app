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
			providesTags: [{ type: 'Rental', id: 'LIST' }],
		}),
		createRental: builder.mutation<IRentalResponse, { data: IRental }>({
			query: ({ data }) => ({
				url: `/rental`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Rental'],
		}),
		confirmRental: builder.mutation<
			{ success: boolean; message: string; data: string },
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/rental/my-rental/${id}/confirm`,
				method: 'PUT',
			}),
		}),
		requestBreakRental: builder.mutation<
			{ success: boolean; message: string },
			{ id: string }
		>({
			query: ({ id }) => ({
				url: `/rental/my-rental/${id}/request-break`,
				method: 'PUT',
			}),
			invalidatesTags: ['Rental'],
		}),
	}),
});

export const {
	useCreateRentalMutation,
	useConfirmRentalMutation,
	useRequestBreakRentalMutation,
	useGetMyRentalQuery,
} = rentalApi;
