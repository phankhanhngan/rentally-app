import type { IRoomBlock } from './block.interface';
import type { ILandlord } from './user.interface';

export interface IRoomDetail {
	id: string;
	price: string;
	images: string[];
	utilities: IUtility[];
	roomblock: IRoomBlock;
	landlord: ILandlord;
	ratingDetail: IRatingDetail;
}

export interface IRatingDetail {
	ratings: IRating[];
	totalRating: number;
	avgRate?: number;
	avgClean?: number;
	avgLocation?: number;
	avgSecurity?: number;
	avgSupport?: number;
}

export interface IUtility {
	id: number;
	name: string;
	note: string;
	icon: string;
}

export interface IRating {
	id: number;
	createdAt: string;
	comment: string;
	cleanRate: number;
	locationRate: number;
	securityRate: number;
	supportRate: number;
	avgRate: number;
	renterName: string;
	renterPhoto: string;
}

export interface IRoomDetailResponse {
	data: IRoomDetail;
	message: string;
	status: string;
}
