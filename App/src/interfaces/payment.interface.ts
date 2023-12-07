import type { IMyRental } from './rental.interface';
import type { PAYMENTSTATUS } from '@/utils/constants';

export interface IMyPayment {
	id: string;
	rental: IMyRental;
	totalPrice: string;
	electricNumber: 81;
	totalElectricPrice: string;
	waterNumber: 8;
	totalWaterPrice: string;
	additionalPrice: string;
	month: number;
	year: number;
	status: PAYMENTSTATUS;
	paidAt: string | null;
	expirationDate: string;
}

export interface IMyPaymentResponse {
	message: string;
	data: string;
	success?: boolean;
}
