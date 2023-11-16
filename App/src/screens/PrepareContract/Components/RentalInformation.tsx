import React from 'react';
import { Text, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SlideInDown } from 'react-native-reanimated';

import DateInput from '@/components/DateInput';
import Dropdown from '@/components/Dropdown';
const RentalInformation = () => {
	return (
		<Animated.View
			style={{
				paddingHorizontal: 24,
				paddingBottom: 16,
				gap: 12,
			}}
			entering={SlideInDown}
		>
			<Text style={{ fontWeight: '800', fontSize: 24, color: '#000' }}>
				Rental information
			</Text>
			<DateInput label="Move in date" />
			<Dropdown label="Lease term" value={undefined} />
			<Dropdown label="Number of tenants" value={undefined} />
		</Animated.View>
	);
};

export default RentalInformation;
