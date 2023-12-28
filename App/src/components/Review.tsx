import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { AirbnbRating } from 'react-native-ratings';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { useReviewRentalMutation } from '@/redux/services/rental/rental.service';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
const reviewTexts = ['Terrible', 'Bad', 'Meh', 'OK', 'Good'];
const Review: React.FC<{ onReviewPress: () => void; rentalId: string }> = ({
	onReviewPress,
	rentalId,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const navigation = useNavigation();
	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const [reviewRental, { data, error, isLoading }] =
		useReviewRentalMutation();
	const initialReview = {
		cleanRate: 5,
		supportRate: 5,
		locationRate: 5,
		securityRate: 5,
		comment: '',
		rentalId,
	};

	const ReviewSchema = Yup.object().shape<Record<string, any>>({
		comment: Yup.string().required('Comment Required!'),
	});

	const submitRentalForm = async (values: any) => {
		try {
			const res = await reviewRental(values).unwrap();
			onReviewPress();
			navigation.navigate('Main');
		} catch (error: any) {
			console.log(error);
			if (error.data.message instanceof Array) {
				Alert.alert('Invalid data!', error.data.message[0]);
			} else {
				Alert.alert('Invalid data!', error.data.message);
			}
		}
	};

	return (
		<Formik
			initialValues={initialReview}
			validationSchema={ReviewSchema}
			onSubmit={submitRentalForm}
		>
			{(formik) => {
				const { values, handleSubmit, setFieldValue } = formik;
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
						<Spinner visible={isLoading} />
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
								onPress={() => handleSubmit()}
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

						<View
							style={{
								flexDirection: 'column',
								flex: 1,
								gap: 2,
								marginTop: 12,
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
										color: '#000',
										fontWeight: '500',
										fontSize: 16,
										paddingTop: 4,
									}}
								>
									Clean rate
								</Text>
								<AirbnbRating
									count={5}
									reviews={reviewTexts}
									defaultRating={5}
									size={20}
									ratingContainerStyle={{
										flexDirection: 'row-reverse',
									}}
									reviewSize={12}
									onFinishRating={(rating) => {
										setFieldValue('cleanRate', rating);
									}}
								/>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Text
									style={{
										color: '#000',
										fontWeight: '500',
										fontSize: 16,
										paddingTop: 4,
									}}
								>
									Support rate
								</Text>
								<AirbnbRating
									count={5}
									reviews={reviewTexts}
									defaultRating={5}
									size={20}
									ratingContainerStyle={{
										flexDirection: 'row-reverse',
									}}
									reviewSize={12}
									onFinishRating={(rating) => {
										setFieldValue('supportRate', rating);
									}}
								/>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Text
									style={{
										color: '#000',
										fontWeight: '500',
										fontSize: 16,
										paddingTop: 4,
									}}
								>
									Location rate
								</Text>
								<AirbnbRating
									count={5}
									reviews={reviewTexts}
									defaultRating={5}
									size={20}
									ratingContainerStyle={{
										flexDirection: 'row-reverse',
									}}
									reviewSize={12}
									onFinishRating={(rating) => {
										setFieldValue('locationRate', rating);
									}}
								/>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Text
									style={{
										color: '#000',
										fontWeight: '500',
										fontSize: 16,
										paddingTop: 4,
									}}
								>
									Security Rate
								</Text>
								<AirbnbRating
									count={5}
									reviews={reviewTexts}
									defaultRating={5}
									size={20}
									ratingContainerStyle={{
										flexDirection: 'row-reverse',
									}}
									reviewSize={12}
									onFinishRating={(rating) => {
										setFieldValue('securityRate', rating);
									}}
								/>
							</View>
							<Text
								style={{
									color: '#000',
									fontWeight: '500',
									fontSize: 16,
									paddingTop: 4,
								}}
							>
								Comment
							</Text>
							<TextInput
								multiline={true}
								numberOfLines={3}
								onFocus={handleFocus}
								onBlur={handleBlur}
								style={[
									styles.inputStyle,
									isFocused && { borderColor: '#E36414' },
								]}
								onChangeText={(text) =>
									setFieldValue('comment', text)
								}
								value={values.comment}
							/>
							<ErrorMessage
								render={(msg) => (
									<Text style={styles.mesStyle}>{msg}</Text>
								)}
								name={'comment'}
							/>
						</View>
					</Animated.View>
				);
			}}
		</Formik>
	);
};

export default Review;

const styles = StyleSheet.create({
	inputStyle: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#5E5D5E',
		paddingLeft: 8,
		fontSize: 16,
		justifyContent: 'center',
		marginTop: 12,
		color: 'gray',
	},
	mesStyle: {
		top: 280,
		left: 10,
		fontSize: 10,
		color: 'red',
		position: 'absolute',
	},
});
