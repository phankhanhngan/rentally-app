import React, { useEffect } from 'react';
import {
	Alert,
	Button,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { useAppDispatch } from '../hooks/redux.hook';
import type { IAuthResponse } from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { useLoginMutation } from '@/redux/services/auth/auth.service';
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
GoogleSignin.configure({
	webClientId:
		'835753748894-nkpb4ri9qqer621v4sq06u7imce8bnri.apps.googleusercontent.com',
});
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

	const initialValues: Values = {
		email: '',
		password: '',
	};
	useEffect(() => {
		if (loginResult.data?.status === 'SUCCESS' && loginResult.data?.data) {
			dispatch(
				setCredentials({ accessToken: loginResult.data?.data?.token }),
			);
			navigation.replace('Main');
		}
		if (loginResult.error && 'data' in loginResult.error) {
			Alert.alert(
				'Invalid data!',
				(loginResult.error?.data as IAuthResponse)?.message,
			);
		}
	}, [loginResult]);

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

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			console.log(userInfo);
		} catch (error) {
			console.log(error);
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	};
	const submitForm = async (values: Values) => {
		console.log(values);
		await login(values).unwrap();
	};

	return (
		<LayoutAuth>
			<Spinner visible={loginResult.isLoading} />
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
							<ScrollView>
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
									placheHolder="Email *"
									onChangeText={handleChange('email')}
									type="email"
									name="email"
									id="email"
									value={values.email}
									label={undefined}
									isSecure={undefined}
								/>
								<TextInputWithLable
									placheHolder="Password *"
									type="password"
									name="password"
									id="password"
									value={values.password}
									onChangeText={handleChange('password')}
									label={undefined}
									secureTextEntry={true}
									isSecure={true}
								/>
								<ButtonWithLoader
									text="Login"
									onPress={handleSubmit}
									isLoading={undefined}
								/>

								<Pressable
									onPress={() =>
										navigation.navigate('ForgotPassword')
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
								<GoogleSigninButton
									size={GoogleSigninButton.Size.Wide}
									color={GoogleSigninButton.Color.Dark}
									onPress={signIn}
								/>
							</ScrollView>
						</SafeAreaView>
					);
				}}
			</Formik>
		</LayoutAuth>
	);
};

export default Login;
