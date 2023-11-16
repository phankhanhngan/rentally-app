import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import RangeSlider from './RangerSilder';
import Utilities from './Utilities';
interface FiltersProps {
	onFilterPress?: () => void;
}

// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Filter = ({ onFilterPress }: FiltersProps) => {
	const MIN_DEFAULT = 10;
	const MAX_DEFAULT = 500;
	const [minValue, setMinValue] = useState(MIN_DEFAULT);
	const [maxValue, setMaxValue] = useState(MAX_DEFAULT);
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
					Filters
				</Text>
				<View style={{ flexDirection: 'row', gap: 4 }}>
					<TouchableOpacity
						onPress={() => {}}
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
						onPress={onFilterPress}
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
			<Utilities />
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
