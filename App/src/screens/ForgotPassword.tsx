import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import type { IAuthResponse, IEmail } from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { useForgotPasswordMutation } from '@/redux/services/auth/auth.service';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';

const ForgotPassword: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParams>>();

	const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();
	const [email, setEmail] = useState<string>('');
	const initialValues: IEmail = {
		email: '',
	};
	useEffect(() => {
		if (forgotPasswordResult.isSuccess) {
			navigation.navigate('ResetPassword', { email: email });
		}
		if (
			forgotPasswordResult.isError &&
			'status' in forgotPasswordResult.error
		) {
			Alert.alert(
				'Invalid data!',
				(forgotPasswordResult.error.data as IAuthResponse).message,
			);
		}
	}, [forgotPasswordResult]);
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
		setEmail(values.email);
		await forgotPassword({ email: values.email }).unwrap();
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
						<Spinner visible={forgotPasswordResult.isLoading} />
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
								placeHolder="Email *"
								onChangeText={handleChange('email')}
								type="email"
								name="email"
								id="email"
								value={values.email}
								label={undefined}
								isSecure={undefined}
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
