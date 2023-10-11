import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import type { IEmail } from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import { useForgotPasswordMutation } from '@/redux/services/auth/auth.service';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';
import { Form, Formik } from 'formik';

const ForgotPassword: React.FC = () => {
	const navigation = useNavigation();

	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

	const initialValues: IEmail = {
		email: '',
	};

	const validate = (values: IEmail): Partial<IEmail> => {
		const errors: Partial<IEmail> = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!regex.test(values.email)) {
			errors.email = 'Invalid Email';
		}
		return errors;
	};

	const submitForm = async (values: IEmail) => {
		console.log(values.email);
		const res = await forgotPassword({ email: values.email }).unwrap();
		console.log(res);
		if (res.status === 'SUCCESS') {
			navigation.navigate('ResetPassword', { email: values.email });
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validate={validate}
			onSubmit={submitForm}
		>
			{(formik) => {
				const { values, handleChange, handleSubmit } = formik;
				return (
					<LayoutAuth>
						<Spinner visible={isLoading} />
						<SafeAreaView
							style={{
								flex: 1,
								backgroundColor: 'white',
								alignItems: 'center',
							}}
						>
							<Text
								style={{
									color: '#1D5868',
									fontSize: 26,
									fontWeight: '600',
								}}
							>
								Forgot Password?
							</Text>
							<View
								style={{ marginTop: 15, flexDirection: 'row' }}
							>
								<Text
									style={{
										color: '#1D5868',
										fontSize: 12,
										width: 260,
										paddingBottom: 10,
									}}
								>
									No worries, we'll send you reset password
									instruction
								</Text>
							</View>
							<TextInputWithLable
								placheHolder="Email *"
								onChangeText={handleChange('email')}
								type="email"
								name="email"
								id="email"
								value={values.email}
							/>
							<ButtonWithLoader
								text="Reset password"
								onPress={handleSubmit}
								isLoading={undefined}
							/>
							<View
								style={{
									marginTop: 40,
									flexDirection: 'row',
								}}
							>
								<Text
									style={{
										color: '#1D5868',
										fontSize: 12,
									}}
								>
									Back to?
								</Text>
								<Pressable
									onPress={() => navigation.navigate('Login')}
								>
									<Text
										style={{
											color: '#E36414',
											fontSize: 12,
											fontWeight: '600',
											paddingBottom: 10,
										}}
									>
										{' '}
										Login
									</Text>
								</Pressable>
							</View>
						</SafeAreaView>
					</LayoutAuth>
				);
			}}
		</Formik>
	);
};
export default ForgotPassword;
