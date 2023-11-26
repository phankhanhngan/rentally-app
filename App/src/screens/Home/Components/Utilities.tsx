import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { useGetUtilitiesQuery } from '@/redux/services/help/help.service';

interface UtilitiesProps {
	selected: any[];
	setSelected: React.Dispatch<React.SetStateAction<any[]>>;
}

const Utilities: React.FC<UtilitiesProps> = ({ selected, setSelected }) => {
	const { data } = useGetUtilitiesQuery('');

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
				Utilities
			</Text>
			<MultiSelect
				style={styles.dropdown}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				search
				data={data!}
				labelField="name"
				valueField="id"
				placeholder="Select item"
				searchPlaceholder="Search..."
				value={selected}
				onChange={(item) => {
					setSelected(item);
				}}
				selectedStyle={styles.selectedStyle}
			/>
		</View>
	);
};

export default Utilities;

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
		backgroundColor: 'transparent',
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 14,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	icon: {
		marginRight: 5,
	},
	selectedStyle: {
		borderRadius: 12,
	},
});
