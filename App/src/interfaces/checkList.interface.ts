import type { IUtiltity } from './utility.interface';

export interface ICheckList {
	id: string;
	price: string;
	images: string[];
	address: string;
	district: string;
	city: string;
	country: string;
	roomName: string;
	move_out_date?: string;
	coordinate: {
		latitude: number;
		longitude: number;
	};
	utilities: IUtiltity[];
	avgRate?: number;
	isInCheckList: boolean;
}
