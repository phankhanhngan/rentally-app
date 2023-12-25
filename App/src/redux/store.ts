import paramsSlice from './features/params/params.slice';
import { checkListApi } from './services/checkList/checkList.service';
import { findingRoomApi } from './services/findingRoom/findingRoom.service';
import { helpApi } from './services/help/help.service';
import { paymentApi } from './services/payment/payment.service';
import { rentalApi } from './services/rental/rental.service';
import { roomDetailApi } from './services/room-detail/room-detail.service';
import { statisticApi } from './services/statistic/statistic.service';
import authSlice from '@/redux/features/auth/auth.slice';
import { authApi } from '@/redux/services/auth/auth.service';
import { userApi } from '@/redux/services/user/user.service';
import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[helpApi.reducerPath]: helpApi.reducer,
	[findingRoomApi.reducerPath]: findingRoomApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[roomDetailApi.reducerPath]: roomDetailApi.reducer,
	[checkListApi.reducerPath]: checkListApi.reducer,
	[statisticApi.reducerPath]: statisticApi.reducer,

	[rentalApi.reducerPath]: rentalApi.reducer,
	[paymentApi.reducerPath]: paymentApi.reducer,

	auth: authSlice.reducer,
	params: paramsSlice.reducer,
});

const customizedMiddleware = getDefaultMiddleware({
	serializableCheck: false,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: customizedMiddleware.concat(
		userApi.middleware,
		authApi.middleware,
		helpApi.middleware,
		findingRoomApi.middleware,
		roomDetailApi.middleware,
		rentalApi.middleware,
		paymentApi.middleware,
		checkListApi.middleware,
	),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
