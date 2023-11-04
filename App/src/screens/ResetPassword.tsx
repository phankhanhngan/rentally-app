import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Mail from '../assets/images/mailsvg.svg';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import type { IAuthResponse } from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import type { RootStackParams } from '@/navigations/StackNavigator';
import {
	useForgotPasswordVerifyMutation,
	useResendEmailMutation,
	useResetPasswordMutation,
} from '@/redux/services/auth/auth.service';
// import { showError } from '../utils/helperFunction';
// import {
// 	NavigationContainer,
// 	useNavigation,
// 	useRoute,
// } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Formik } from 'formik';

interface ResetPasswordValues {
	password: string;
	confirmPassword: string;
}
interface SendCodeValues {
	code: string;
}
type Props = NativeStackScreenProps<RootStackParams, 'ResetPassword'>;
const ResetPassword = ({ navigation, route }: Props) => {
	// const navigation =
	// 	useNavigation<
	// 		NativeStackNavigationProp<RootStackParams, 'ResetPassword'>
	// 	>();
	// const route = useRoute();

	const email = route?.params?.email || '';
	const [isPermitted, setIsPermitted] = useState<boolean>(false);
	const [resetPassword, resetPasswordResult] = useResetPasswordMutation();
	const [forgotPasswordVerify, forgotPasswordVerifyResult] =
		useForgotPasswordVerifyMutation();
	const [resendEmail, { isLoading: isResendEmailLoading }] =
		useResendEmailMutation();
	const [code, setCode] = useState<string>('');

	const initialValues: ResetPasswordValues = {
		password: '',
		confirmPassword: '',
	};
	const initialSendCodeValues: SendCodeValues = {
		code: '',
	};
	useEffect(() => {
		if (resetPasswordResult.data?.status === 'SUCCESS') {
			navigation.navigate('Login');
		}
		if (resetPasswordResult.error && 'data' in resetPasswordResult.error) {
			Alert.alert(
				'Invalid data!',
				(resetPasswordResult.error?.data as IAuthResponse)?.message,
			);
		}
	}, [resetPasswordResult]);

	useEffect(() => {
		if (forgotPasswordVerifyResult.data?.status === 'SUCCESS') {
			setIsPermitted(true);
		}
		if (
			forgotPasswordVerifyResult.error &&
			'data' in forgotPasswordVerifyResult.error
		) {
			Alert.alert(
				'Invalid data!',
				(forgotPasswordVerifyResult.error?.data as IAuthResponse)
					?.message,
			);
		}
	}, [forgotPasswordVerifyResult]);

	const resetPasswordValidate = (values: ResetPasswordValues) => {
		const errors: Partial<ResetPasswordValues> = {};
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 6) {
			errors.password = 'Password too short';
		}

		if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	};
	const sendCodeValidate = (
		values: SendCodeValues,
	): Partial<SendCodeValues> => {
		const errors: Partial<SendCodeValues> = {};
		if (!values.code) {
			errors.code = 'Email is required';
		}
		return errors;
	};

	const submitResetPasswordForm = async (values: ResetPasswordValues) => {
		await resetPassword({
			email: email || '',
			password: values.password,
			code: 'R-' + code,
		}).unwrap();
	};
	const submitCodeForm = async (values: SendCodeValues) => {
		await forgotPasswordVerify({
			email: email || '',
			code: 'R-' + values.code,
		}).unwrap();
		setCode(values.code);
	};

	const handleResetPassword = async () => {
		const res = await resendEmail({ email: email || '' }).unwrap();
		console.log(res);
	};

	return (
		<LayoutAuth>
			<Spinner
				visible={
					resetPasswordResult.isLoading ||
					forgotPasswordVerifyResult.isLoading ||
					isResendEmailLoading
				}
			/>
			{!isPermitted ? (
				<Formik
					initialValues={initialSendCodeValues}
					validate={sendCodeValidate}
					onSubmit={submitCodeForm}
				>
					{(formik) => {
						const { values, handleChange, handleSubmit } = formik;

						return (
							<SafeAreaView
								style={{
									flex: 1,
									backgroundColor: 'white',
									alignItems: 'center',
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										gap: 10,
										alignContent: 'center',
									}}
								>
									<Mail height={40} />
									<Text
										style={{
											color: '#1D5868',
											fontSize: 24,
											fontWeight: '600',
										}}
									>
										Check your email!
									</Text>
								</View>

								<View style={{ marginTop: 15 }}>
									<Text
										style={{
											color: '#1D5868',
											fontSize: 12,
											width: 260,
										}}
									>
										We sent a verification code to
									</Text>
									<Text
										style={{
											color: '#E36414',
											fontSize: 12,
											width: 260,
											paddingBottom: 10,
										}}
									>
										{route?.params?.email}
									</Text>
								</View>
								<TextInputWithLable
									placeHolder="Code *"
									onChangeText={handleChange('code')}
									value={values.code}
									isSecure={undefined}
									label={undefined}
									name="code"
									id="code"
								/>

								<ButtonWithLoader
									text="Reset password"
									onPress={handleSubmit}
									isLoading={undefined}
								/>
								<View
									style={{
										marginTop: 15,
										flexDirection: 'row',
										alignSelf: 'flex-start',
									}}
								>
									<Text
										style={{
											color: '#1D5868',
											fontSize: 12,
										}}
									>
										Didn't receive the email?
									</Text>
									<Pressable
										onPress={() => {
											handleResetPassword();
										}}
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
											Click to resend
										</Text>
									</Pressable>
								</View>
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
										onPress={() =>
											navigation.navigate('Login')
										}
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
						);
					}}
				</Formik>
			) : (
				<Formik
					initialValues={initialValues}
					validate={resetPasswordValidate}
					onSubmit={submitResetPasswordForm}
				>
					{(formik) => {
						const { values, handleChange, handleSubmit } = formik;

						return (
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
									Reset Password
								</Text>
								<View style={{ width: 260 }}>
									<View
										style={{
											flexDirection: 'row',
											alignSelf: 'flex-start',
										}}
									>
										<Text
											style={{
												color: '#1D5868',
												fontSize: 12,
											}}
										>
											In order to protect
										</Text>

										<Text
											style={{
												color: '#E36414',
												fontSize: 12,
												fontWeight: '600',
											}}
										>
											{' '}
											protect your account,{' '}
										</Text>
										<Text
											style={{
												color: '#1D5868',
												fontSize: 12,
											}}
										>
											make
										</Text>
									</View>
									<Text
										style={{
											color: '#1D5868',
											fontSize: 12,
										}}
									>
										your password:
									</Text>
									<View
										style={{
											flexDirection: 'column',
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<Text
												style={{
													color: '#1D5868',
													fontSize: 16,
													fontWeight: 'bold',
													marginRight: 5,
												}}
											>
												•
											</Text>
											<Text
												style={{
													color: '#1D5868',
													fontSize: 12,
												}}
											>
												Longer than 8 characters
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<Text
												style={{
													color: '#1D5868',
													fontSize: 16,
													fontWeight: 'bold',
													marginRight: 5,
												}}
											>
												•
											</Text>
											<Text
												style={{
													color: '#1D5868',
													fontSize: 12,
												}}
											>
												Does not match or contain your
												username
											</Text>
										</View>
									</View>
								</View>
								<TextInputWithLable
									placeHolder="Password *"
									secureTextEntry={true}
									label={undefined}
									isSecure={undefined}
									type="password"
									name="password"
									id="password"
									value={values.password}
									onChangeText={handleChange('password')}
								/>
								<TextInputWithLable
									placeHolder="Confirm password *"
									secureTextEntry={true}
									label={undefined}
									isSecure={undefined}
									type="password"
									name="password"
									id="password"
									value={values.confirmPassword}
									onChangeText={handleChange(
										'confirmPassword',
									)}
								/>
								<ButtonWithLoader
									text="Reset password"
									onPress={handleSubmit}
									isLoading={undefined}
								/>
							</SafeAreaView>
						);
					}}
				</Formik>
			)}
		</LayoutAuth>
	);
};
export default ResetPassword;
