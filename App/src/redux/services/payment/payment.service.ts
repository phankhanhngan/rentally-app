import { createApiWithAuth } from '../apiWithAuth.service';
import type {
	IMyPayment,
	IMyPaymentResponse,
} from '@/interfaces/payment.interface';

const createApiRentalWithAuth = createApiWithAuth('paymentApi', ['Payment']);

export const paymentApi = createApiRentalWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getMyPayment: builder.query<
			{
				message: string;
				status: string;
				data: IMyPayment[];
			},
			string
		>({
			query: () => {
				return {
					url: 'payments/my-payment',
				};
			},
			providesTags: [{ type: 'Payment', id: 'LIST' }],
		}),
		checkOut: builder.mutation<IMyPaymentResponse, { id: string }>({
			query: ({ id }) => ({
				url: `stripe/check-out/${id}`,
				method: 'POST',
			}),
			// invalidatesTags: [{ type: 'Payment', id: 'LIST' }],
		}),
	}),
});

export const { useGetMyPaymentQuery, useCheckOutMutation } = paymentApi;
