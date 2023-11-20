import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ParamsState {
	searchParamsObject: Record<string, string[] | number[]>;
}

const initialState: ParamsState = {
	searchParamsObject: { page: ['1'] },
};

const paramsSlice = createSlice({
	name: 'params',
	initialState,
	reducers: {
		setParams: (state, action: PayloadAction<Record<string, string[]>>) => {
			state.searchParamsObject = action.payload;
		},
		addParam: (
			state,
			action: PayloadAction<{
				name: string;
				values: string[] | number[];
			}>,
		) => {
			const { name, values } = action.payload;
			state.searchParamsObject[name] = values;
		},
		removeParam: (state, action: PayloadAction<string>) => {
			const paramNameToRemove = action.payload;
			delete state.searchParamsObject[paramNameToRemove];
		},
		resetParams: (state) => {
			state.searchParamsObject = {};
		},
	},
});

export const { setParams, addParam, removeParam, resetParams } =
	paramsSlice.actions;

export default paramsSlice;
