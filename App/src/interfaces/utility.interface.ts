export interface IUtiltity {
	name: string;
	note: string;
	id: number;
	icon: string;
}
export interface IUtiltityResponse {
	data: {
		utilities: IUtiltity[];
	};
	message: string;
	status: string;
}
