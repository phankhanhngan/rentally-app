import { createApiWithAuth } from '../apiWithAuth.service';
import type { ICheckList } from '@/interfaces/checkList.interface';
import type { IRoomFinding } from '@/interfaces/roomfiding.interface';

const createApiCheckListWithAuth = createApiWithAuth('checkListApi', [
	'checkList',
]);

export const checkListApi = createApiCheckListWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getCheckList: builder.query<
			{
				message: string;
				status: number;
				data?: ICheckList[];
			},
			string
		>({
			query: () => {
				return {
					url: '/checklist',
				};
			},
		}),
	}),
});

export const { useGetCheckListQuery } = checkListApi;
