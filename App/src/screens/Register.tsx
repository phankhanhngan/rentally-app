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
import Spinner from 'react-native-loading-spinner-overlay';

import Mail from '../assets/images/mailsvg.svg';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import type { IAccounRegister } from '@/interfaces/auth.interface';
import LayoutAuth from '@/Layout/LayoutAuth';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hook';
// import { showError } from '../utils/helperFunction';
import {
	useRegisterMutation,
	useRegisterVerificationMutation,
	useResendEmailMutation,
} from '@/redux/services/auth/auth.service';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

type RegisterValues = IAccounRegister & { confirmPassword?: string };

interface SendCodeValues {
	code: string;
}

const data = [
	{ value: 'USER', label: 'renter' },
	{ value: 'MOD', label: 'Landlord' },
];
const Register = () => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const [isPermitted, setIsPermitted] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');
	const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
	const [registerVerification, { isLoading: isRegisterVerificationLoading }] =
		useRegisterVerificationMutation();
	const [resendEmail, { isLoading: isResendEmailLoading }] =
		useResendEmailMutation();
	const ref = useRef<IDropdownRef>(null);
	const initialRegisterValues: RegisterValues = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		phoneNumber: '',
		role: '',
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
		role: Yup.string().required('Role Required!'),
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
		console.log(body, confirmPassword);
		const res = await register(body).unwrap();
		if (res.status === 'SUCCESS') {
			setIsPermitted(true);
			setEmail(body.email);
		}
	};
	const submitCodeForm = async (values: SendCodeValues) => {
		console.log(values.code);
		const body = {
			email: email,
			code: 'R-' + values.code,
		};
		const res = await registerVerification(body).unwrap();
		console.log(res);
		if (res.status === 'SUCCESS' && res.data) {
			dispatch(setCredentials({ accessToken: res.data.token }));
			navigation.replace('Main');
		}
	};
	const handleResetPassword = async () => {
		const res = await resendEmail({ email: email }).unwrap();
		console.log(res);
	};
	return (
		<SafeAreaView>
			<Spinner
				visible={
					isRegisterLoading ||
					isRegisterVerificationLoading ||
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
				<Formik
					initialValues={initialSendCodeValues}
					validate={sendCodeValidate}
					onSubmit={submitCodeForm}
				>
					{(formik) => {
						const { values, handleChange, handleSubmit } = formik;
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
											{email}
										</Text>
									</View>
									<TextInputWithLable
										placheHolder="Code *"
										onChangeText={handleChange('code')}
										value={values.code}
										isSecure={undefined}
										label={undefined}
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
							</LayoutAuth>
						);
					}}
				</Formik>
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
