import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { showError } from '../utils/helperFunction';
import { setCredentials } from '@/redux/features/auth/auth.slice';
import { useLoginMutation } from '@/redux/services/auth/auth.service';
const Login = ({ navigation }) => {
	const [state, setState] = useState({
		email: '',
		password: '',
		isSecure: true,
	});
	const { email, password, isSecure } = state;
	const dispatch = useAppDispatch();
	const updateState = (data) => setState(() => ({ ...state, ...data }));
	const [login, { isLoading }] = useLoginMutation();

	const onLogin = async () => {
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
		<View style={styles.container}>
			<TextInputWithLable
				label="Email"
				placheHolder="enter your email"
				onChangeText={(email) => updateState({ email })}
				value={undefined}
				isSecure={undefined}
			/>
			<TextInputWithLable
				label="Password"
				placheHolder="enter your password"
				// isSecure={isSecure}
				secureTextEntry={isSecure}
				onChangeText={(password) => updateState({ password })}
				value={undefined}
				isSecure={undefined}
			/>
			<ButtonWithLoader
				text="Login"
				onPress={onLogin}
				isLoading={undefined}
			/>
			<View style={{ marginVertical: 8 }} />
			<ButtonWithLoader
				text="Signup"
				onPress={() => navigation.navigate('Register')}
				isLoading={undefined}
			/>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: 'white',
	},
});
