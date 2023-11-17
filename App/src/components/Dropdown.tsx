import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { type FormikErrors, ErrorMessage } from 'formik';

interface BasicInputProps {
	label: string;
	value: string;
	name: string;
	data: { label: string; value: string }[];
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined,
	) => Promise<void | FormikErrors<any>>;
}
export default ({
	label = 'Label',
	name,
	data,
	setFieldValue,
	value,
}: BasicInputProps) => {
	const [isFocus, setIsFocus] = useState(false);
	return (
		<View style={{ width: '100%' }}>
			<Text
				style={{
					color: '#000',
					fontWeight: '500',
					fontSize: 16,
				}}
			>
				{label}
			</Text>
			<ErrorMessage
				name={name || ''}
				render={(msg) => (
					<Text
						style={{
							top: 86,
							left: 10,
							fontSize: 10,
							color: 'red',
							position: 'absolute',
						}}
					>
						{msg}
					</Text>
				)}
			/>
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: '#E36414' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				search
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? ' ' : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={(item) => {
					setIsFocus(false);
					setFieldValue(name, item.value);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	dropdown: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#5E5D5E',
		height: 50,
		paddingLeft: 8,
		fontSize: 18,
		justifyContent: 'center',
		marginTop: 12,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
