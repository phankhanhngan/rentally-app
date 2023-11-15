import type { FC } from 'react';
import React, { useState } from 'react';
import type { KeyboardTypeOptions } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TextInputWithLabelProps {
	value: string | undefined;
	name?: string;
	id?: string;
	type?: string;
	keyboardType?: KeyboardTypeOptions;
	placeHolder?: string;
	isSecure?: boolean;
	onChangeText?: (text: string) => void;
}

const TextInputWithLabel: FC<TextInputWithLabelProps> = ({
	value,
	name,
	onChangeText,
	...props
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<Text style={{ color: '#000', fontWeight: '500', fontSize: 16 }}>
				Identity number
			</Text>
			<TextInput
				// value={value}
				onChangeText={onChangeText}
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={[
					styles.inputStyle,
					isFocused && { borderColor: '#E36414' },
				]}
				{...props}
			/>
			{/* Uncomment the following lines if you want to display an error message */}
			{/* <ErrorMessage
        name={name || ''}
        render={(msg) => <Text style={styles.mesStyle}>{msg}</Text>}
      /> */}
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
		top: 48,
		left: 10,
		fontSize: 10,
		color: 'red',
		position: 'absolute',
	},
});

export default TextInputWithLabel;
