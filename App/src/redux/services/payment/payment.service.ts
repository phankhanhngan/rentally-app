import { createApiWithAuth } from '../apiWithAuth.service';
import type {
	IMyPayment,
	IMyPaymentResponse,
} from '@/interfaces/payment.interface';
import type { PAYMENTSTATUS } from '@/utils/constants';

const createApiRentalWithAuth = createApiWithAuth('paymentApi', ['Payment']);

export const paymentApi = createApiRentalWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getMyPayment: builder.query<
			{
				message: string;
				status: string;
				data: IMyPayment[];
			},
			PAYMENTSTATUS
		>({
			query: (status) => {
				return {
					url: `payments/my-payment?status=${status}`,
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
