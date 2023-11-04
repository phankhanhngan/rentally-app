import type { FC } from 'react';
import React from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ErrorMessage } from 'formik';

interface TextInputWithLabelProps {
	value: string | undefined;
	name?: string;
	id?: string;
	type?: string;
	keyboardType?: KeyboardTypeOptions;
	secureTextEntry?: boolean;
	placeHolder?: string;
	isSecure?: boolean;
	onChangeText?: (text: string) => void;
}

const TextInputWithLabel: FC<TextInputWithLabelProps> = ({
	value,
	name,
	placeHolder,
	isSecure,
	onChangeText,
	...props
}) => {
	return (
		<View style={{ marginBottom: 16 }}>
			<TextInput
				value={value}
				placeholder={placeHolder}
				onChangeText={onChangeText}
				style={styles.inputStyle}
				placeholderTextColor="rgba(29, 36, 51, 0.8)"
				secureTextEntry={isSecure}
				{...props}
			/>
			<ErrorMessage
				name={name || ''}
				render={(msg) => <Text style={styles.mesStyle}>{msg}</Text>}
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

export default TextInputWithLabel;
