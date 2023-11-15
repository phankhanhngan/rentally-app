import React from 'react';
import { Text, View } from 'react-native';

import DateInput from '@/components/DateInput';
import Dropdown from '@/components/Dropdown';

const RentalInformation = () => {
	return (
		<View
			style={{
				paddingHorizontal: 24,
				paddingBottom: 16,
				gap: 12,
			}}
		>
			<Text style={{ fontWeight: '800', fontSize: 26, color: '#000' }}>
				Rental information
			</Text>
			<DateInput />
			<Dropdown />
			<Dropdown />
		</View>
	);
};

export default RentalInformation;
