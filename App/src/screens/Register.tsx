import React, { useRef, useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import type { IDropdownRef } from 'react-native-element-dropdown';
import { Dropdown } from 'react-native-element-dropdown';

import Mail from '../assets/images/mailsvg.svg';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import LayoutAuth from '@/Layout/LayoutAuth';
// import { showError } from '../utils/helperFunction';
import {
	useRegisterMutation,
	useRegisterVerificationMutation,
	useResendEmailMutation,
} from '@/redux/services/auth/auth.service';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

interface Values {
	email: string;
	password: string;
	confirmPassword: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	role: string;
}

const data = [
	{ value: 'USER', label: 'renter' },
	{ value: 'MOD', label: 'Landlord' },
];
const Register = () => {
	const navigation = useNavigation();
	const [isPermitted, setIsPermitted] = useState(false);
	const [code, setCode] = useState<{ email: string; code: string }>({
		email: '',
		code: '',
	});
	const initialValues: Values = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		role: '',
		confirmPassword: '',
	};
	const [register] = useRegisterMutation();
	const [resendEmail] = useResendEmailMutation();
	const [registerVerification] = useRegisterVerificationMutation();
	const ref = useRef<IDropdownRef>(null);
	const validate = (values: Values) => {
		const errors: Partial<Values> = {};
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

		if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		if (!values.firstName) {
			errors.firstName = 'First name is required';
		}

		if (!values.lastName) {
			errors.lastName = 'Last name is required';
		}

		if (!values.phoneNumber) {
			errors.phoneNumber = 'Phone number is required';
		}

		if (!values.role) {
			errors.role = 'Role is required';
		}
		console.log(errors);
		return errors;
	};
	const submitForm = async (values: Values) => {
		const { confirmPassword, ...body } = values;
		console.log(body, confirmPassword);
		const res = await register(body).unwrap();
		console.log(res);
		if (res.status === 'SUCCESS') {
			setIsPermitted(true);
			setCode((pre) => ({ ...pre, email: body.email }));
		}
	};
	const handleSubmitCode = async () => {
		console.log(code);
		const body = {
			email: code.email,
			code: 'R-' + code.code,
		};
		console.log(body);
		const res = await registerVerification(body).unwrap();
		console.log(res);
		if (res.status === 'SUCCESS') {
			navigation.navigate('Login');
		}
	};
	const handleResetPassword = async () => {
		const res = await resendEmail({
			email: code.email || '',
		}).unwrap();
		console.log(res);
	};
	return (
		<SafeAreaView>
			{!isPermitted ? (
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={submitForm}
				>
					{(formik) => {
						const { values, handleChange, handleSubmit } = formik;

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
										marginTop: 30,
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
													Login now{' '}
												</Text>
											</Pressable>
										</View>
										<TextInputWithLable
											placheHolder="Email *"
											type="email"
											name="email"
											id="email"
											value={values.email}
											onChangeText={handleChange('email')}
											isSecure={undefined}
											label={undefined}
										/>
										<TextInputWithLable
											placheHolder="Password *"
											secureTextEntry={true}
											label={undefined}
											isSecure={undefined}
											type="password"
											name="password"
											id="password"
											value={values.password}
											onChangeText={handleChange(
												'password',
											)}
										/>
										<TextInputWithLable
											placheHolder="Confirm password *"
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
										<TextInputWithLable
											placheHolder="Firstname *"
											type="firstName"
											name="firstName"
											id="firstName"
											value={values.firstName}
											onChangeText={handleChange(
												'firstName',
											)}
											isSecure={undefined}
											label={undefined}
										/>
										<TextInputWithLable
											placheHolder="Lastname *"
											type="lastName"
											name="lastName"
											id="lastName"
											value={values.lastName}
											onChangeText={handleChange(
												'lastName',
											)}
											isSecure={undefined}
											label={undefined}
										/>
										<TextInputWithLable
											placheHolder="Phone number *"
											type="phoneNumber"
											name="phoneNumber"
											id="phoneNumber"
											value={values.phoneNumber}
											onChangeText={handleChange(
												'phoneNumber',
											)}
											isSecure={undefined}
											label={undefined}
											keyboardType="numeric"
										/>
										<View
											style={{
												flexDirection: 'row',
												alignSelf: 'flex-start',
												marginTop: -12,
											}}
										>
											<Text
												style={{
													color: '#E36414',
													fontSize: 12,
												}}
											>
												Which describes best your role?
											</Text>
										</View>
										<View
											style={{
												marginVertical: 10,
												flexDirection: 'row',
												alignItems: 'center',
												marginBottom: 15,
											}}
										>
											<Dropdown
												ref={ref}
												style={{
													flex: 1,
													height: 38,
													borderWidth: 2,
													borderRadius: 8,
													borderColor: '#E1E6EF',
													backgroundColor: '#F1F3F9',
												}}
												placeholderStyle={
													styles.placeholderStyle
												}
												selectedTextStyle={
													styles.selectedTextStyle
												}
												inputSearchStyle={
													styles.inputSearchStyle
												}
												iconStyle={styles.iconStyle}
												data={data}
												search
												maxHeight={300}
												labelField="label"
												valueField="value"
												placeholder="Role"
												searchPlaceholder="Search..."
												value={values.role}
												onChange={(item) =>
													handleChange('role')(
														item ? item.value : '',
													)
												}
												// eslint-disable-next-line @typescript-eslint/no-empty-function
												onChangeText={() => {}} // Keep search keyword
											/>
										</View>

										<ButtonWithLoader
											text="Reset password"
											onPress={handleSubmit}
											title="Submit"
											isLoading={undefined}
										/>
									</SafeAreaView>
								</View>
							</KeyboardAvoidingView>
						);
					}}
				</Formik>
			) : (
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
								{code.email}
							</Text>
						</View>
						<TextInputWithLable
							placheHolder="Code *"
							onChangeText={(code: string) =>
								setCode((values) => ({ ...values, code: code }))
							}
							value={code.code}
							isSecure={undefined}
							label={undefined}
						/>

						<ButtonWithLoader
							text="Register"
							onPress={handleSubmitCode}
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
			)}
		</SafeAreaView>
	);
};

export default Register;
const styles = StyleSheet.create({
	placeholderStyle: {
		fontSize: 14,
		color: 'rgba(29, 36, 51, 0.8)',
	},
	selectedTextStyle: {
		fontSize: 14,
		margin: 8,
		color: 'rgba(29, 36, 51, 0.8)',
	},
	iconStyle: {
		width: 10,
		height: 10,
	},
	inputSearchStyle: {
		height: 38,
		fontSize: 14,
	},
});
