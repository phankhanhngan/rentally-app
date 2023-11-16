import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

const Utilities = () => {
	const [selected, setSelected] = useState([]);

	const data = [
		{ key: '2', value: 'Appliances' },
		{ key: '3', value: 'Cameras' },

		{ key: '5', value: 'Vegetables' },
		{ key: '6', value: 'Diary Products' },
		{ key: '7', value: 'Drinks' },
	];

	return (
		<View>
			<Text
				style={{
					color: '#000',
					fontWeight: '500',
					fontSize: 16,
					marginBottom: 12,
				}}
			>
				{' '}
				Utilities
			</Text>
			<MultipleSelectList
				setSelected={(val) => setSelected(val)}
				data={data}
				save="value"
				labelStyles={{ display: 'none' }}
				fontFamily="regular"
				notFoundText="No data exits"
				dropdownStyles={{ height: 160, width: '100%' }}
				boxStyles={{
					borderColor: '#5E5D5E',
					borderWidth: 1,
					borderRadius: 8,
				}}
			/>
		</View>
	);
};

export default Utilities;
