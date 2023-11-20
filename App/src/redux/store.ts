import paramsSlice from './features/params/params.slice';
import { checkListApi } from './services/checkList/checkList.service';
import { findingRoomApi } from './services/findingRoom/findingRoom.service';
import { helpApi } from './services/help/help.service';
import { myRentalApi } from './services/myRental/myRental.service';
import { rentalApi } from './services/rental/rental.service';
import { roomDetailApi } from './services/room-detail/room-detail.service';
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
	[myRentalApi.reducerPath]: myRentalApi.reducer,

	[rentalApi.reducerPath]: rentalApi.reducer,
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
		myRentalApi.middleware,
		checkListApi.middleware,
	),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
