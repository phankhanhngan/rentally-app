import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import LayoutAuth from '@/Layout/LayoutAuth';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { useLoginMutation } from '@/redux/services/auth/auth.service';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const [state, setState] = useState({
		email: '',
		password: '',
		isSecure: true,
	});
	const { email, password, isSecure } = state;
	const updateState = (data: {
		email?: any;
		password?: any;
		isSecure?: boolean;
	}) => setState(() => ({ ...state, ...data }));
	const [login, { isLoading }] = useLoginMutation();

	const onLogin = async () => {
		navigation.replace('Main');
		try {
			console.log({
				email,
				password,
			});
			const userData = await login({
				email,
				password,
			}).unwrap();
			console.log('res==>>>>>', userData);

			dispatch(setCredentials({ ...userData }));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<LayoutAuth>
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
					<Pressable onPress={() => navigation.navigate('Register')}>
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
					onChangeText={(email: any) => updateState({ email })}
					value={undefined}
					isSecure={undefined}
					label={undefined}
				/>
				<TextInputWithLable
					placheHolder="Password *"
					// isSecure={isSecure}
					secureTextEntry={isSecure}
					onChangeText={(password: any) => updateState({ password })}
					value={undefined}
					isSecure={undefined}
					label={undefined}
				/>
				<ButtonWithLoader
					text="Login"
					onPress={onLogin}
					isLoading={undefined}
				/>
				<Pressable
					onPress={() => navigation.navigate('ForgotPassword')}
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
			</SafeAreaView>
		</LayoutAuth>
	);
};

export default Login;
