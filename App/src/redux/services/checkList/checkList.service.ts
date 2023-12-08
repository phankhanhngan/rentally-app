import { createApiWithAuth } from '../apiWithAuth.service';
import type { ICheckList } from '@/interfaces/checkList.interface';

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
			providesTags: ['checkList'],
		}),
		createChecklist: builder.mutation<
			{
				success: string;
				message: string;
			},
			{ roomId: string }
		>({
			query: ({ roomId }) => ({
				url: `/checklist`,
				method: 'POST',
				body: { roomId },
			}),
			invalidatesTags: ['checkList'],
		}),
	}),
});

export const { useGetCheckListQuery, useCreateChecklistMutation } =
	checkListApi;
