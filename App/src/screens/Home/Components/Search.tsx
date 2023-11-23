import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Icon2 from 'react-native-vector-icons/Ionicons';

import BasicInput from '@/components/BasicInput';
import Dropdown from '@/components/Dropdown';
import { addParam, removeParam } from '@/redux/features/params/params.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
	useGetDistrictsQuery,
	useGetProvincesQuery,
} from '@/redux/services/help/help.service';
import { useFormik } from 'formik';
interface SearchProps {
	onSearchPress: () => void;
}

const Search = ({ onSearchPress }: SearchProps) => {
	const dispatch = useAppDispatch();

	const searchParamsObject = useAppSelector(
		(state) => state.params.searchParamsObject,
	);

	const initialSearchValues = {
		keyword:
			(searchParamsObject['keyword'] &&
				searchParamsObject['keyword'][0]) ||
			'',
		province:
			(searchParamsObject['province'] &&
				searchParamsObject['province'][0]) ||
			'0',
		district:
			(searchParamsObject['district'] &&
				searchParamsObject['district'][0]) ||
			'0',
	};

	const onSubmit = async (values: any) => {
		console.log(values);
		dispatch(
			addParam({
				name: 'keyword',
				values: [values.keyword],
			}),
		);
		values.province !== '0'
			? dispatch(
					addParam({
						name: 'province',
						values: [values.province],
					}),
			  )
			: dispatch(removeParam('province'));
		values.district !== '0'
			? dispatch(
					addParam({
						name: 'district',
						values: [values.district],
					}),
			  )
			: dispatch(removeParam('district'));
		onSearchPress();
	};
	const formik = useFormik({
		initialValues: initialSearchValues,
		onSubmit: onSubmit,
	});
	const { values, setFieldValue, handleSubmit } = formik;

	console.log(searchParamsObject);
	const { data: provincesData } = useGetProvincesQuery('');

	const { data: districtsData } = useGetDistrictsQuery({
		province_code: values.province,
	});
	console.log(values);
	useEffect(() => {
		values.district = '0';
	}, [values.province]);

	return (
		<Animated.View
			entering={SlideInDown.springify().damping(15)}
			exiting={SlideOutDown}
			style={{
				backgroundColor: 'white',
				padding: 24,
				height: 400,
				width: '100%',
				position: 'absolute',
				bottom: -20 * 1.1,
				borderTopRightRadius: 20,
				borderTopLeftRadius: 20,
				zIndex: 1,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text
					style={{
						fontSize: 26,
						fontWeight: '700',
						color: '#000',
						marginBottom: 12,
					}}
				>
					Search
				</Text>
				<TouchableOpacity
					onPress={handleSubmit}
					activeOpacity={0.7}
					style={[
						{
							backgroundColor: '#E36414',
							paddingVertical: 12,
							borderRadius: 30,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							gap: 2,
						},
						{ paddingRight: 10, paddingLeft: 10 },
					]}
				>
					<Text
						style={{
							color: '#fff',
							fontSize: 16,
							fontFamily: 'mon-b',
						}}
					>
						Search
					</Text>
					<Icon2 name="search" size={20} color={'#fff'} />
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'column', flex: 1, gap: 2 }}>
				<BasicInput
					label="Keyword"
					value={values.keyword as string}
					isValidate={false}
					name={'keyword'}
					setFieldValue={setFieldValue}
				/>
				<Dropdown
					label="Province"
					value={values.province}
					isValidate={false}
					name={'province'}
					data={[
						{
							code: '0',
							name: 'All',
						},
						...(provincesData ?? []),
					]}
					setFieldValue={setFieldValue}
				/>
				<Dropdown
					label="District"
					value={values.district}
					isValidate={false}
					name={'district'}
					data={[
						{
							code: '0',
							name: 'All',
						},
						...(districtsData ?? []),
					]}
					setFieldValue={setFieldValue}
				/>
			</View>
		</Animated.View>
	);
};

export default Search;
