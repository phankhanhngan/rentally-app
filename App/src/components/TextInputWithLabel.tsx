import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const TextInputWithLable = ({
	label,
	value,
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
				{...props}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		height: 38,
		width: 260,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#E1E6EF',
		color: 'black',
		paddingHorizontal: 12,
		backgroundColor: '#F1F3F9',
	},
});

export default TextInputWithLable;
