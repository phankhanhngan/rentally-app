import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { useAppDispatch } from '../hooks/redux.hook';
import LayoutAuth from '@/Layout/LayoutAuth';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword: React.FC = () => {
	const navigation = useNavigation();
	const [state, setState] = useState({
		email: '',
		password: '',
		isSecure: true,
	});
	const { email, isSecure } = state;
	const dispatch = useAppDispatch();
	const updateState = (data: {
		email?: any;
		password?: any;
		isSecure?: boolean;
	}) => setState(() => ({ ...state, ...data }));

	const onLogin = async () => {
		try {
			console.log({
				email,
			});
			navigation.navigate('ResetPassword');
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
					Forgot Password?
				</Text>
				<View style={{ marginTop: 15, flexDirection: 'row' }}>
					<Text
						style={{
							color: '#1D5868',
							fontSize: 12,
							width: 260,
							paddingBottom: 10,
						}}
					>
						No worries, we'll send you reset password instruction
					</Text>
				</View>
				<TextInputWithLable
					placheHolder="Email *"
					onChangeText={(email: any) => updateState({ email })}
					value={undefined}
					isSecure={undefined}
					label={undefined}
				/>
				<ButtonWithLoader
					text="Reset password"
					onPress={onLogin}
					isLoading={undefined}
				/>
			</SafeAreaView>
		</LayoutAuth>
	);
};
export default ForgotPassword;
