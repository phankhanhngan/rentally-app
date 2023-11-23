import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import RangeSlider from './RangerSilder';
import Utilities from './Utilities';
import { addParam } from '@/redux/features/params/params.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useGetPriceQuery } from '@/redux/services/help/help.service';

interface FiltersProps {
	onFilterPress: () => void;
}

const Filter: React.FC<FiltersProps> = ({ onFilterPress }) => {
	const { data } = useGetPriceQuery('');
	const MIN_DEFAULT = +(data?.data.minPrice || 0);
	const MAX_DEFAULT = +(data?.data.maxPrice || 1000);
	const dispatch = useAppDispatch();
	const searchParamsObject = useAppSelector(
		(state) => state.params.searchParamsObject,
	);

	const [rerender, setRerender] = useState(0);

	const [minValue, setMinValue] = useState<number>(
		+(
			searchParamsObject['minPrice'] && searchParamsObject['minPrice'][0]
		) || MIN_DEFAULT,
	);
	const [maxValue, setMaxValue] = useState(
		+(
			searchParamsObject['maxPrice'] && searchParamsObject['maxPrice'][0]
		) || MAX_DEFAULT,
	);
	const [selected, setSelected] = useState<number[]>(
		(searchParamsObject['utility'] || []).map((value) => Number(value)),
	);

	const handleClear = () => {
		setSelected([]);
		setMinValue(MIN_DEFAULT);
		setMaxValue(MAX_DEFAULT);
		setRerender((prev) => ++prev);
	};

	const handleFilter = () => {
		dispatch(
			addParam({
				name: 'minPrice',
				values: [minValue],
			}),
		);
		dispatch(
			addParam({
				name: 'maxPrice',
				values: [maxValue],
			}),
		);
		dispatch(
			addParam({
				name: 'utility',
				values: selected,
			}),
		);
		onFilterPress();
	};

	return (
		<Animated.View
			entering={SlideInDown.springify().damping(15)}
			exiting={SlideOutDown}
			style={{
				backgroundColor: 'white',
				padding: 24,
				height: 500,
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
					Filters
				</Text>
				<View style={{ flexDirection: 'row', gap: 4 }}>
					<TouchableOpacity
						onPress={handleClear}
						style={[
							{
								paddingVertical: 12,

								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'row',
								gap: 2,
							},
							{ paddingRight: 16, paddingLeft: 16 },
						]}
					>
						<Text
							style={{
								color: '#000',
								fontSize: 16,
								fontFamily: 'mon-b',
								fontWeight: '700',
								textDecorationLine: 'underline',
							}}
						>
							Clear
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={handleFilter}
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
							{ paddingRight: 16, paddingLeft: 16 },
						]}
					>
						<Text
							style={{
								color: '#fff',
								fontSize: 16,
								fontFamily: 'mon-b',
							}}
						>
							Save
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ flexDirection: 'column', flex: 1, gap: 2 }}>
				<Text
					style={{
						color: '#000',
						fontWeight: '500',
						fontSize: 16,
						marginBottom: 12,
					}}
				>
					Price
				</Text>
				<RangeSlider
					key={rerender}
					maxInit={maxValue}
					minInit={minValue}
					sliderWidth={300}
					min={MIN_DEFAULT}
					max={MAX_DEFAULT}
					step={10}
					onValueChange={(range) => {
						setMinValue(range.min);
						setMaxValue(range.max);
					}}
				/>
				<View style={styles.tableContainer}>
					<View style={{ width: '40%' }}>
						<Text style={styles.colorBlack}>Min Price</Text>
						<View style={styles.table}>
							<Text style={styles.colorBlack}>${minValue}</Text>
						</View>
					</View>
					<View style={{ width: '40%' }}>
						<Text style={styles.colorBlack}>Max Price</Text>
						<View style={styles.table}>
							<Text style={styles.colorBlack}>${maxValue}</Text>
						</View>
					</View>
				</View>
				<Utilities selected={selected} setSelected={setSelected} />
			</View>
		</Animated.View>
	);
};

export default Filter;

const styles = StyleSheet.create({
	tableContainer: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
	},
	table: {
		borderColor: '#5E5D5E',
		borderWidth: 1,
		padding: 10,
		marginTop: 5,
		borderRadius: 8,
	},
	colorBlack: { color: 'black' },
});
