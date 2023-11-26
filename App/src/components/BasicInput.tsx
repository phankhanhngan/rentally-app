import type { FC } from 'react';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { type FormikErrors, ErrorMessage } from 'formik';

interface BasicInputProps {
	isValidate?: boolean;
	name: string;
	value: string;
	label: string;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined,
	) => Promise<void | FormikErrors<any>>;
}

const TextInputWithLabel: FC<BasicInputProps> = ({
	value,
	isValidate = true,
	setFieldValue,
	label,
	name,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<View style={{ width: '100%' }}>
			<Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>
				{label}
			</Text>
			<TextInput
				value={value}
				onChangeText={(text) => setFieldValue(name, text)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={[
					styles.inputStyle,
					isFocused && { borderColor: '#E36414' },
				]}
			/>

			{isValidate && (
				<ErrorMessage
					name={name || ''}
					render={(msg) => <Text style={styles.mesStyle}>{msg}</Text>}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#5E5D5E',
		height: 50,
		paddingLeft: 8,
		fontSize: 16,
		justifyContent: 'center',
		marginTop: 12,
		color: 'gray',
	},
	mesStyle: {
		top: 86,
		left: 10,
		fontSize: 10,
		color: 'red',
		position: 'absolute',
	},
});

export default TextInputWithLabel;
