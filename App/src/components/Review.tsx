import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const reviewTexts = ['Terrible', 'Bad', 'Meh', 'OK', 'Good'];
const Review: React.FC = () => {
	const ratingCompleted = (rating) => {
		console.log('Rating is: ' + rating);
	};
	return (
		<Animated.View
			entering={SlideInDown.springify().damping(15)}
			exiting={SlideOutDown}
			style={{
				backgroundColor: 'white',
				padding: 24,
				height: 500,
				width: '100%',
				position: 'absolute',
				bottom: -20 * 1.1,
				borderTopRightRadius: 20,
				borderTopLeftRadius: 20,
				zIndex: 1,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text
					style={{
						fontSize: 26,
						fontWeight: '700',
						color: '#000',
						marginBottom: 12,
					}}
				>
					Review Room
				</Text>
				<TouchableOpacity
					activeOpacity={0.7}
					// onPress={handleFilter}
					style={[
						{
							backgroundColor: '#E36414',
							paddingVertical: 12,
							borderRadius: 30,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							gap: 2,
						},
						{ paddingRight: 16, paddingLeft: 16 },
					]}
				>
					<Text
						style={{
							color: '#fff',
							fontSize: 16,
							fontFamily: 'mon-b',
						}}
					>
						Save
					</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'column', flex: 1, gap: 2 }}>
				<View>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
							marginBottom: 12,
						}}
					>
						Clean rate
					</Text>
					<AirbnbRating
						count={5}
						reviews={reviewTexts}
						defaultRating={5}
						size={20}
						reviewSize={12}
						onFinishRating={ratingCompleted}
					/>
				</View>
				<AirbnbRating
					count={5}
					reviews={reviewTexts}
					defaultRating={5}
					size={20}
					reviewSize={12}
					onFinishRating={ratingCompleted}
				/>
				<AirbnbRating
					count={5}
					reviews={reviewTexts}
					defaultRating={5}
					size={20}
					reviewSize={12}
					onFinishRating={ratingCompleted}
				/>
				<AirbnbRating
					count={5}
					reviews={reviewTexts}
					defaultRating={5}
					size={20}
					reviewSize={12}
					onFinishRating={ratingCompleted}
				/>
			</View>
		</Animated.View>
	);
};

export default Review;
