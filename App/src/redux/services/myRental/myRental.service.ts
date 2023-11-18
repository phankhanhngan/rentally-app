import { createApiWithAuth } from '../apiWithAuth.service';
import type { IRoomFinding } from '@/interfaces/roomfiding.interface';

const createApiMyRentalWithAuth = createApiWithAuth('myRentalApi', [
	'myRental',
]);

export const myRentalApi = createApiMyRentalWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getMyRental: builder.query<
			{
				message: string;
				success: boolean;
				data?: any;
			},
			any
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
