import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import LayoutAuth from '@/Layout/LayoutAuth';
import { useForgotPasswordMutation } from '@/redux/services/auth/auth.service';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword: React.FC = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState<string>('');
	const [forgotPassword] = useForgotPasswordMutation();

	const handleResetPassword = async () => {
		const res = await forgotPassword({ email }).unwrap();
		console.log(res);
		if (res.status === 'SUCCESS') {
			navigation.navigate('ResetPassword', { email: email });
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
					onChangeText={(email: any) => setEmail(email)}
					value={undefined}
					isSecure={undefined}
					label={undefined}
				/>
				<ButtonWithLoader
					text="Reset password"
					onPress={handleResetPassword}
					isLoading={undefined}
				/>
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
					<Pressable onPress={() => navigation.navigate('Login')}>
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
};
export default ForgotPassword;
