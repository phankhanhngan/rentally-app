import React from 'react';
import {
	KeyboardAvoidingView,
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
import LayoutAuth from '@/Layout/LayoutAuth';
import { setCredentials } from '@/redux/features/auth/auth.slice';
// import { useAppSelector } from '@/redux/hook';
import { useLoginMutation } from '@/redux/services/auth/auth.service';
// import { getData, storeData } from '@/utils/helpers/asyncStorage';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';
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
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const initialValues: Values = {
		email: '',
		password: '',
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
	// console.log(useAppSelector((state) => state.auth.accessToken));

	// console.log('2',getData('jwt'));
	const submitForm = async (values: Values) => {
		console.log(values);
		const res = await login(values).unwrap();
		console.log(res);
		if (res.status === 'SUCCESS') {
			dispatch(setCredentials({ accessToken: res.data.token }));
			navigation.replace('Main');
		}
	};

	return (
		<LayoutAuth>
			<Spinner visible={isLoading} />
			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={submitForm}
			>
				{(formik) => {
					const {
						values,
						handleChange,
						handleSubmit,
						dirty,
						isValid,
					} = formik;
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
									title="Submit"
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
							</ScrollView>
						</SafeAreaView>
					);
				}}
			</Formik>
		</LayoutAuth>
	);
};

export default Login;
