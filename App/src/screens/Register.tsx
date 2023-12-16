import React, { useEffect, useState } from 'react';
import {
	Alert,
	Image,
	KeyboardAvoidingView,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Mail from '../assets/images/mailsvg.svg';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import useRefetch from '@/hooks/useRefetch';
import type {
	IAccounRegister,
	IAuthResponse,
} from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { addParam } from '@/redux/features/params/params.slice';
import { useAppDispatch } from '@/redux/hook';
import {
	useRegisterMutation,
	useRegisterVerificationMutation,
	useResendEmailMutation,
} from '@/redux/services/auth/auth.service';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

type RegisterValues = IAccounRegister & {
	confirmPassword?: string;
};

interface SendCodeValues {
	code: string;
}

const Register = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParams>>();
	const dispatch = useAppDispatch();

	const [isPermitted, setIsPermitted] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');

	const [register, registerResult] = useRegisterMutation();
	const refetch = useRefetch();
	const [registerVerification, registerVerificationResult] =
		useRegisterVerificationMutation();
	const [resendEmail, { isLoading: isResendEmailLoading }] =
		useResendEmailMutation();
	const initialRegisterValues: RegisterValues = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
		role: 'USER',
	};
	const initialSendCodeValues: SendCodeValues = {
		code: '',
	};

	const RegisterSchema = Yup.object().shape<Record<string, any>>({
		email: Yup.string()
			.email('Email is invalid!')
			.required('Email Required!'),
		firstName: Yup.string().required('Firstname Required!'),
		lastName: Yup.string().required('Lastname Required!'),
		password: Yup.string()
			.min(4, 'Password must be minimum 4 digits!')
			.required('Password Required!'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), undefined], 'Password must match!')
			.required('Confirm password is reqired!'),
		phoneNumber: Yup.string()
			.matches(
				/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
				'Invalid phone number',
			)
			.required('Number phone must be required!'),
	});
	const sendCodeValidate = (
		values: SendCodeValues,
	): Partial<SendCodeValues> => {
		const errors: Partial<SendCodeValues> = {};
		if (!values.code) {
			errors.code = 'Email is required';
		}
		return errors;
	};

	const submitRegisterForm = async (values: RegisterValues) => {
		const { confirmPassword, ...body } = values;

		try {
			const res = await register(body).unwrap();
			if (res.status === 'SUCCESS') {
				setIsPermitted(true);
				setEmail(body.email);
			}
		} catch (error: any) {
			console.log(error.data.message);
			if (error.data.message instanceof Array) {
				Alert.alert('Invalid data!', error.data.message[0]);
			} else {
				Alert.alert('Invalid data!', error.data.message);
			}
		}
	};
	const submitCodeForm = async (values: SendCodeValues) => {
		const body = {
			email: email,
			code: 'R-' + values.code,
		};
		try {
			const res = await registerVerification(body).unwrap();
			if (res.status === 'SUCCESS' && res.data) {
				dispatch(setCredentials({ accessToken: res.data.token }));
				navigation.replace('Main');
				refetch();
			}
		} catch (error: any) {
			console.log(error.data.message);
			if (error.data.message instanceof Array) {
				Alert.alert('Invalid data!', error.data.message[0]);
			} else {
				Alert.alert('Invalid data!', error.data.message);
			}
		}
	};
	const handleResetPassword = async () => {
		const res = await resendEmail({ email: email }).unwrap();
	};
	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: 'white' }}
			behavior={'height'}
		>
			<SafeAreaView>
				<ScrollView>
					<Spinner
						visible={
							registerResult.isLoading ||
							registerVerificationResult.isLoading ||
							isResendEmailLoading
						}
					/>
					{!isPermitted ? (
						<Formik
							initialValues={initialRegisterValues}
							validationSchema={RegisterSchema}
							onSubmit={submitRegisterForm}
						>
							{(formik) => {
								const { values, handleChange, handleSubmit } =
									formik;

								return (
									<KeyboardAvoidingView
										style={{
											backgroundColor: 'white',
											alignItems: 'center',
										}}
									>
										<Image
											source={require('../assets/images/rentallyLogo.png')}
											style={{
												width: 60,
												height: 60,
												marginTop: 60,
											}}
										/>
										<View>
											<SafeAreaView
												style={{
													marginTop: 20,
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
													Create new account
												</Text>
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
														Already a member?
													</Text>
													<Pressable
														onPress={() =>
															navigation.navigate(
																'Login',
															)
														}
													>
														<Text
															style={{
																color: '#E36414',
																fontSize: 12,
																fontWeight:
																	'600',
																paddingBottom: 10,
															}}
														>
															{' '}
															Login now{' '}
														</Text>
													</Pressable>
												</View>
												<TextInputWithLable
													placeHolder="Email *"
													type="email"
													name="email"
													id="email"
													value={values.email}
													onChangeText={handleChange(
														'email',
													)}
												/>
												<TextInputWithLable
													placeHolder="Password *"
													secureTextEntry={true}
													type="password"
													name="password"
													id="password"
													value={values.password}
													onChangeText={handleChange(
														'password',
													)}
												/>
												<TextInputWithLable
													placeHolder="Confirm password *"
													secureTextEntry={true}
													type="password"
													name="password"
													id="password"
													value={
														values.confirmPassword
													}
													onChangeText={handleChange(
														'confirmPassword',
													)}
												/>
												<TextInputWithLable
													placeHolder="Firstname *"
													type="firstName"
													name="firstName"
													id="firstName"
													value={values.firstName}
													onChangeText={handleChange(
														'firstName',
													)}
												/>
												<TextInputWithLable
													placeHolder="Lastname *"
													type="lastName"
													name="lastName"
													id="lastName"
													value={values.lastName}
													onChangeText={handleChange(
														'lastName',
													)}
												/>
												<TextInputWithLable
													placeHolder="Phone number *"
													type="phoneNumber"
													name="phoneNumber"
													id="phoneNumber"
													value={values.phoneNumber}
													onChangeText={handleChange(
														'phoneNumber',
													)}
													keyboardType="numeric"
												/>

												<ButtonWithLoader
													text="Register"
													onPress={handleSubmit}
													isLoading={undefined}
												/>
											</SafeAreaView>
										</View>
									</KeyboardAvoidingView>
								);
							}}
						</Formik>
					) : (
						<Formik
							initialValues={initialSendCodeValues}
							validate={sendCodeValidate}
							onSubmit={submitCodeForm}
						>
							{(formik) => {
								const { values, handleChange, handleSubmit } =
									formik;
								return (
									<LayoutAuth>
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
													We sent a verification code
													to
												</Text>
												<Text
													style={{
														color: '#E36414',
														fontSize: 12,
														width: 260,
														paddingBottom: 10,
													}}
												>
													{email}
												</Text>
											</View>
											<TextInputWithLable
												placeHolder="Code *"
												onChangeText={handleChange(
													'code',
												)}
												value={values.code}
												name="code"
												id="code"
											/>

											<ButtonWithLoader
												text="Register"
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
														navigation.navigate(
															'Login',
														)
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
									</LayoutAuth>
								);
							}}
						</Formik>
					)}
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Register;
