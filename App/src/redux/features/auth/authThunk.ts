// import { useDispatch } from 'react-redux';

// import { useGetCheckListQuery } from '@/redux/services/checkList/checkList.service';

import { removeData, storeData } from '@/utils/helpers/asyncStorage';

export const setCredentialsThunk = async (
	{ accessToken }: { accessToken: string },
	thunkAPI: any,
) => {
	try {
		await storeData('jwt', accessToken as string);
		// const dispatch = useDispatch();
		// Dispatch an action to initiate the API call

		// Perform additional logic if needed
		return accessToken;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
};
export const logOutThunk = async (_, thunkAPI: any) => {
	try {
		await removeData('jwt');

		// const dispatch = useDispatch();
		// Access refetch function from thunkAPI.extra and call it
		// thunkAPI.extra.refetchRental();

		// You can also dispatch other actions as needed
		// thunkAPI.dispatch(useGetCheckListQuery('').refetch());
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error);
	}
};
