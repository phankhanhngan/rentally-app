import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

interface RangeSliderProps {
	sliderWidth: number;
	min: number;
	max: number;
	step: number;
	onValueChange: (values: { min: number; max: number }) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
	sliderWidth,
	min,
	max,
	step,
	onValueChange,
}) => {
	const position = useSharedValue(0);
	const position2 = useSharedValue(sliderWidth);
	const opacity = useSharedValue(0);
	const opacity2 = useSharedValue(0);
	const zIndex = useSharedValue(0);
	const zIndex2 = useSharedValue(0);

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
			ctx.startX = position.value;
		},
		onActive: (e, ctx) => {
			opacity.value = 1;
			if (ctx.startX + e.translationX < 0) {
				position.value = 0;
			} else if (ctx.startX + e.translationX > position2.value) {
				position.value = position2.value;
				zIndex.value = 1;
				zIndex2.value = 0;
			} else {
				position.value = ctx.startX + e.translationX;
			}
		},
		onEnd: () => {
			opacity.value = 0;
			runOnJS(onValueChange)({
				min:
					min +
					Math.floor(
						position.value / (sliderWidth / ((max - min) / step)),
					) *
						step,
				max:
					min +
					Math.floor(
						position2.value / (sliderWidth / ((max - min) / step)),
					) *
						step,
			});
		},
	});

	const gestureHandler2 = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
			ctx.startX = position2.value;
		},
		onActive: (e, ctx) => {
			opacity2.value = 1;
			if (ctx.startX + e.translationX > sliderWidth) {
				position2.value = sliderWidth;
			} else if (ctx.startX + e.translationX < position.value) {
				position2.value = position.value;
				zIndex.value = 0;
				zIndex2.value = 1;
			} else {
				position2.value = ctx.startX + e.translationX;
			}
		},
		onEnd: () => {
			opacity2.value = 0;
			runOnJS(onValueChange)({
				min:
					min +
					Math.floor(
						position.value / (sliderWidth / ((max - min) / step)),
					) *
						step,
				max:
					min +
					Math.floor(
						position2.value / (sliderWidth / ((max - min) / step)),
					) *
						step,
			});
		},
	});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: position.value }],
		zIndex: zIndex.value,
	}));

	const animatedStyle2 = useAnimatedStyle(() => ({
		transform: [{ translateX: position2.value }],
		zIndex: zIndex2.value,
	}));

	const opacityStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const opacityStyle2 = useAnimatedStyle(() => ({
		opacity: opacity2.value,
	}));

	const sliderStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: position.value }],
		width: position2.value - position.value,
	}));

	const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
	const minLabelText = useAnimatedProps(() => {
		return {
			value: `${
				min +
				Math.floor(
					position.value / (sliderWidth / ((max - min) / step)),
				) *
					step
			}`,
		};
	});
	const maxLabelText = useAnimatedProps(() => {
		return {
			value: `${
				min +
				Math.floor(
					position2.value / (sliderWidth / ((max - min) / step)),
				) *
					step
			}`,
		};
	});
	return (
		<View style={[styles.sliderContainer, { width: sliderWidth }]}>
			<View style={[styles.sliderBack, { width: sliderWidth }]} />
			<Animated.View style={[sliderStyle, styles.sliderFront]} />
			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View style={[animatedStyle, styles.thumb]}>
					<Animated.View style={[opacityStyle, styles.label]}>
						{/* <AnimatedTextInput
							style={styles.labelText}
							animatedProps={minLabelText}
							editable={false}
							value={'0'}
						/> */}
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
			<PanGestureHandler onGestureEvent={gestureHandler2}>
				<Animated.View style={[animatedStyle2, styles.thumb]}>
					<Animated.View style={[opacityStyle2, styles.label]}>
						{/* <AnimatedTextInput
							style={styles.labelText}
							animatedProps={maxLabelText}
							editable={false}
							defaultValue={'0'}
						/> */}
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

export default RangeSlider;

const styles = StyleSheet.create({
	sliderContainer: {
		justifyContent: 'center',
		alignSelf: 'center',
	},
	sliderBack: {
		height: 4,
		backgroundColor: '#DFEAFB',
		borderRadius: 20,
	},
	sliderFront: {
		height: 4,
		backgroundColor: '#5E5D5E',
		borderRadius: 20,
		position: 'absolute',
	},
	thumb: {
		left: -10,
		width: 20,
		height: 20,
		position: 'absolute',
		backgroundColor: 'white',
		borderColor: '#5E5D5E',
		borderWidth: 5,
		borderRadius: 10,
	},
	label: {
		position: 'absolute',
		top: -40,
		bottom: 20,
		backgroundColor: 'black',
		borderRadius: 5,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	labelText: {
		color: 'white',
		padding: 5,
		fontWeight: 'bold',
		fontSize: 16,
		width: '100%',
	},
});
