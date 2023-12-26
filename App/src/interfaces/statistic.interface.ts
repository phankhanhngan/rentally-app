export interface IStatisticResponse {
	message: string;
	status: string;
	data: {
		statistics: IStatistic[];
	};
}
export interface IStatistic {
	cost: number;
	electric: number;
	water: number;
	additionalPrice: number;
	month: number;
	increase: number;
}
