import type { FC } from 'react';
import React from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';

interface ButtonWithLoaderProps {
	isLoading?: boolean;
	text?: string;
	onPress?: () => void;
}

const ButtonWithLoader: FC<ButtonWithLoaderProps> = ({
	isLoading,
	text,
	onPress,
}) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.btnStyle}>
			{isLoading ? (
				<ActivityIndicator size="large" color="white" />
			) : (
				<Text style={styles.textStyle}>{text}</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btnStyle: {
		height: 40,
		width: 320,
		backgroundColor: '#E36414',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		paddingHorizontal: 16,
	},
	textStyle: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white',
	},
});

export default ButtonWithLoader;
