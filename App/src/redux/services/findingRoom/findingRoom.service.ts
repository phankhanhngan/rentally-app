import { createApiWithAuth } from '../apiWithAuth.service';
import type { IRoomFinding } from '@/interfaces/roomfiding.interface';

const createApifindingRoomWithAuth = createApiWithAuth('findingRoomApi', [
	'findingRoom',
]);

export const findingRoomApi = createApifindingRoomWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getFindingRooms: builder.query<
			{ message: string; status: number; data?: IRoomFinding[] },
			any
		>({
			query: (params) => {
				return {
					url: '/finding',
					params: params,
				};
			},
		}),
	}),
});

export const { useGetFindingRoomsQuery } = findingRoomApi;
