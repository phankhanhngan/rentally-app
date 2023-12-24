import React, { useEffect } from 'react';
import { Alert, Pressable, SafeAreaView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { useAppDispatch } from '../hooks/redux.hook';
import useRefetch from '@/hooks/useRefetch';
import type { IAuthResponse } from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import {
	useContinueWithGGMutation,
	useLoginMutation,
} from '@/redux/services/auth/auth.service';
import { signInWithGoogle } from '@/utils/helpers/auth';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import {
// 	GoogleSignin,
// 	GoogleSigninButton,
// 	statusCodes,
// } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';

interface Values {
	email: string;
	password: string;
}
type Errors = {
	email?: string;
	password?: string;
};
const Login = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParams>>();
	const dispatch = useAppDispatch();
	const [login, loginResult] = useLoginMutation();
	const refetch = useRefetch();
	const [continueWithGG, { isLoading: isContinueWithGGLoading }] =
		useContinueWithGGMutation();
	const initialValues: Values = {
		email: '',
		password: '',
	};
	useEffect(() => {
		if (loginResult.data?.status === 'SUCCESS' && loginResult.data?.data) {
			dispatch(
				setCredentials({ accessToken: loginResult.data?.data?.token }),
			);
			refetch();
			navigation.replace('Main');
		}
		if (loginResult.error && 'data' in loginResult.error) {
			Alert.alert(
				'Invalid data!',
				(loginResult.error?.data as IAuthResponse)?.message,
			);
		}
	}, [loginResult]);
	const handleSignIn = async () => {
		const userInfo = await signInWithGoogle();

		const res = await continueWithGG({
			id: userInfo?.user.id || '',
			familyName: userInfo?.user.familyName || '',
			email: userInfo?.user.email || '',
			givenName: userInfo?.user.givenName || '',
			photo: userInfo?.user.photo || '',
		}).unwrap();
		if (res.status === 'SUCCESS' && res.data) {
			dispatch(setCredentials({ accessToken: res.data.token }));
			refetch();
			navigation.replace('Main');
		}
	};

	const validate = (values: Values): Errors => {
		const errors: Errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!regex.test(values.email)) {
			errors.email = 'Invalid Email';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 4) {
			errors.password = 'Password too short';
		}
		return errors;
	};

	const submitForm = async (values: Values) => {
		await login(values).unwrap();
	};

	return (
		<LayoutAuth>
			<Spinner
				visible={loginResult.isLoading || isContinueWithGGLoading}
			/>
			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={submitForm}
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
							<View style={{ alignItems: 'center' }}>
								<Text
									style={{
										color: '#1D5868',
										fontSize: 26,
										fontWeight: '600',
									}}
								>
									Login to your account
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
										Not a member?
									</Text>
									<Pressable
										onPress={() =>
											navigation.navigate('Register')
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
											Create account{' '}
										</Text>
									</Pressable>
								</View>
								<TextInputWithLable
									placeHolder="Email *"
									onChangeText={handleChange('email')}
									type="email"
									name="email"
									id="email"
									value={values.email}
								/>
								<TextInputWithLable
									placeHolder="Password *"
									type="password"
									name="password"
									id="password"
									value={values.password}
									onChangeText={handleChange('password')}
									secureTextEntry={true}
								/>
								<ButtonWithLoader
									text="Login"
									onPress={handleSubmit}
									isLoading={undefined}
								/>
								<View
									style={{
										justifyContent: 'space-between',
										flexDirection: 'row',
										alignItems: 'flex-start',
										marginTop: 20,
										gap: 140,
									}}
								>
									<Pressable
										onPress={() =>
											navigation.navigate(
												'ForgotPassword',
											)
										}
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
											Forgot your password?
										</Text>
									</Pressable>
									{/* <Pressable
										// size={GoogleSigninButton.Size.Wide}
										// color={GoogleSigninButton.Color.Dark}
										onPress={handleSignIn}
										style={{
											marginTop: 15,
											flexDirection: 'row',
											alignSelf: 'flex-start',
										}}
									>
										<Text>Login with GG</Text>
									</Pressable> */}
									<GoogleSigninButton
										size={GoogleSigninButton.Size.Icon}
										onPress={handleSignIn}
									/>
								</View>
							</View>
						</SafeAreaView>
					);
				}}
			</Formik>
		</LayoutAuth>
	);
};

export default Login;
