import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ErrorMessage } from 'formik';

const TextInputWithLable = ({
	label,
	value,
	name,
	placheHolder,
	isSecure,
	onChangeText,
	...props
}) => {
	return (
		<View style={{ marginBottom: 16 }}>
			<TextInput
				value={value}
				placeholder={placheHolder}
				onChangeText={onChangeText}
				style={styles.inputStyle}
				placeholderTextColor="rgba(29, 36, 51, 0.8)"
				secureTextEntry={isSecure}
				{...props}
			/>
			<ErrorMessage
				component={Text}
				name={name || ''}
				style={styles.mesStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		height: 48,
		width: 320,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#E1E6EF',
		color: 'black',
		paddingHorizontal: 12,
		backgroundColor: '#F1F3F9',
	},
	mesStyle: {
		top: 48,
		left: 10,
		fontSize: 10,
		color: 'red',
		position: 'absolute',
	},
});

export default TextInputWithLable;
