import React, { useState } from 'react';
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
import { Formik } from 'formik';
interface SearchProps {
	onSearchPress?: () => void;
}

const Search = ({ onSearchPress }: SearchProps) => {
	const dispatch = useAppDispatch();
	const searchParamsObject = useAppSelector(
		(state) => state.params.searchParamsObject,
	);
	console.log(searchParamsObject);
	const { data: provincesData } = useGetProvincesQuery('');
	const initialSearchValues = {
		keyword: searchParamsObject['keyword'][0] || '',
		provinceCode: '',
		districtCode: '',
	};
	console.log(provincesData);
	const { data: districtsData, isLoading } = useGetDistrictsQuery({
		province_code: '10',
	});
	console.log(districtsData);

	const onSubmit = async (values: any) => {
		dispatch(
			addParam({
				name: 'keyword',
				values: [values.keyword],
			}),
		);
		values.provinceCode
			? dispatch(
					addParam({
						name: 'province',
						values: [values.provinceCode],
					}),
			  )
			: dispatch(removeParam('province'));
		values.districtCode
			? dispatch(
					addParam({
						name: 'district',
						values: [values.districtCode],
					}),
			  )
			: dispatch(removeParam('district'));
		onSearchPress();
	};

	return (
		<Formik initialValues={initialSearchValues} onSubmit={onSubmit}>
			{(formik) => {
				const { values, setFieldValue, handleSubmit } = formik;
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

						<View
							style={{ flexDirection: 'column', flex: 1, gap: 2 }}
						>
							<BasicInput
								label="Keyword"
								value={values.keyword as string}
								isValidate={false}
								name={'keyword'}
								setFieldValue={setFieldValue}
							/>
							<Dropdown
								label="Province"
								value={values.provinceCode}
								isValidate={false}
								name={'Province'}
								data={provincesData || []}
								setFieldValue={setFieldValue}
							/>
							<Dropdown
								label="District"
								value={values.districtCode}
								isValidate={false}
								name={'District'}
								data={districtsData || []}
								setFieldValue={setFieldValue}
							/>
						</View>
					</Animated.View>
				);
			}}
		</Formik>
	);
};

export default Search;
