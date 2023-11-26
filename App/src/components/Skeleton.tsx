import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface SkeletonProps {
	variant?: 'box' | 'circle';
	width: number | string;
	height: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
	height,
	width,
	variant,
}) => {
	const opacity = useRef(new Animated.Value(0.3));

	let borderRadius = 20;
	if (variant === 'circle') {
		borderRadius =
			typeof height === 'string' ? parseInt(height, 10) / 2 : height / 2;
	}
	useEffect(() => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(opacity.current, {
					toValue: 1,
					useNativeDriver: true,
					duration: 500,
				}),
				Animated.timing(opacity.current, {
					toValue: 0.3,
					useNativeDriver: true,
					duration: 800,
				}),
			]),
		).start();
	}, [opacity]);
	return (
		<Animated.View
			style={[
				{
					opacity: opacity.current,
					height: height,
					borderRadius,
					width: width,
				},
				styles.skeleton,
			]}
		/>
	);
};
const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: '#ccc',
	},
});
