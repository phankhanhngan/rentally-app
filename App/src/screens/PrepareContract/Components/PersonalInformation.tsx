import React from 'react';
import { Text, View } from 'react-native';

import BasicInput from '@/components/BasicInput';
import DateInput from '@/components/DateInput';
// import Dropdown from '@/components/Dropdown';

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
			<View
				style={{
					backgroundColor: '#F0F0F0',
					padding: 12,
					borderRadius: 8,
				}}
			>
				<Text style={{}}>
					· These information will be used to prepare the digital
					contract, please help to provide correct information
				</Text>
				<Text style={{}}>
					· The contract then will be proceeded by the host
				</Text>
				<Text style={{}}>
					· You will be informed when the host accept your
					confirmation
				</Text>
			</View>
			<BasicInput label="Phone" value={''} />
			<BasicInput label="Identity number" value={''} />
			<BasicInput label="Identity date of issue" value={''} />
			<BasicInput label="Identity place of issue" value={''} />
			<DateInput label="Birthday" />
			{/* <Dropdown /> */}
		</View>
	);
};

export default PersonalInformation;
