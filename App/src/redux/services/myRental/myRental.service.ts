import { createApiWithAuth } from '../apiWithAuth.service';
import type { IMyRental } from '@/interfaces/rental.interface';

const createApiMyRentalWithAuth = createApiWithAuth('myRentalApi', [
	'myRental',
]);

export const myRentalApi = createApiMyRentalWithAuth.injectEndpoints({
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
		}),
	}),
});

export const { useGetMyRentalQuery } = myRentalApi;
