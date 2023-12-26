import { createApiWithAuth } from '../apiWithAuth.service';
import type { IStatisticResponse } from '@/interfaces/statistic.interface';

const createApistatisticWithAuth = createApiWithAuth('statistic', [
	'statistic',
]);

export const statisticApi = createApistatisticWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		getStatistic: builder.query<IStatisticResponse, number>({
			query: (year) => {
				return {
					url: `/statistic/cost/${year}`,
				};
			},
		}),
	}),
});

export const { useGetStatisticQuery } = statisticApi;
