import { createApiWithAuth } from '../apiWithAuth.service';
import type {
	IMyRental,
	IRental,
	IRentalResponse,
} from '@/interfaces/rental.interface';
import type { STATUS } from '@/utils/constants';

const createApiRentalWithAuth = createApiWithAuth('rentalApi', ['Rental']);

export const rentalApi = createApiRentalWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getMyRental: builder.query<
			{
				message: string;
				success: boolean;
				data: IMyRental[];
			},
			STATUS
		>({
			query: (status) => {
				return {
					url: `/rental/my-rental?status=${status}`,
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
			query: ({ id }) => {
				console.log(id);
				return {
					url: `/rental/my-rental/${id}/confirm`,
					method: 'PUT',
				};
			},
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
		reviewRental: builder.mutation<
			{ data: any; message: string; status: string },
			{
				rentalId: number;
				comment: string;
				cleanRate: number;
				supportRate: number;
				locationRate: number;
				securityRate: number;
			}
		>({
			query: (data) => ({
				url: `/rating`,
				method: 'POST',
				body: data,
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
	useReviewRentalMutation,
} = rentalApi;
