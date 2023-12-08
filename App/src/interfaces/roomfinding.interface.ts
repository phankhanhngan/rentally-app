import type { IUtiltity } from './utility.interface';

export interface IRoomFinding {
	id: string;
	price: string;
	images: string[];
	address: string;
	district: string;
	isInCheckList: boolean;
	coordinate: {
		latitude: number;
		longitude: number;
	};
	utilities: IUtiltity[];
	avgRate?: number;
}
