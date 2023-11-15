import React from 'react';
import { Text, View } from 'react-native';

import BasicInput from '@/components/BasicInput';
import DateInput from '@/components/DateInput';
import Dropdown from '@/components/Dropdown';

const PersonalInformation = () => {
	return (
		<View
			style={{
				paddingHorizontal: 24,
				paddingBottom: 16,
				gap: 12,
			}}
		>
			<Text style={{ fontWeight: '800', fontSize: 24, color: '#000' }}>
				Personal information
			</Text>
			<BasicInput value={''} />
			<BasicInput value={''} />
			<BasicInput value={''} />
			<BasicInput value={''} />
			<Dropdown />
		</View>
	);
};

export default PersonalInformation;
