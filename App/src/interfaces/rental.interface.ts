import type { IRoomBlock } from './block.interface';
import type { IRoom } from './room.interface';
import type { IUser } from './user.interface';
import type { STATUS } from '@/utils/constants';

export interface IRental {
	roomId: string;
	tenantInfo: ITenantInfo;
	rentalInfo: IRentalInfo;
}

export interface IMyRental {
	status: STATUS;
	rentalInfo: IRentalInfo & {
		moveOutDate?: string;
		electricPrice?: number;
		waterPrice?: number;
		rentalDetailId: string;
		leaseTerminationCost?: number;
		additionalPrice?: number;
		id?: string;
		photo?: string;
	};
	hostInfo: IUser;
	roomInfo: IRoom;
	roomBlockInfo: IRoomBlock & {
		roomRatings: {
			avgRate: number;
			numberOfRatings: number;
		};
	};
}

export interface ITenantInfo {
	identityNumber: string;
	identityDateOfIssue: string;
	identityPlaceOfIsse: string;
	birthday: string;
	phoneNumber: string;
}

export interface IRentalInfo {
	leaseTerm: number;
	moveInDate: string;
	numberOfTenants: number;
}

export interface IRentalResponse {
	message: string;
	status: string;
	success?: boolean;
}
