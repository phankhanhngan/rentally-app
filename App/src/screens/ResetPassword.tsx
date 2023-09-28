import React, { useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import Mail from '../assets/images/mailsvg.svg';
import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { useAppDispatch } from '../hooks/redux.hook';
import LayoutAuth from '@/Layout/LayoutAuth';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';

const ResetPassword: React.FC = () => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();

	const [isPermitted, setIsPermitted] = useState(false);
	const [code, setCode] = useState<string>('');

	const [state, setState] = useState({
		password: '',
		confirmPassword: '',
	});
	const { password, confirmPassword } = state;
	const updateState = (data: {
		password?: string;
		confirmPassword?: string;
	}) => setState(() => ({ ...state, ...data }));

	const handleSubmitCode = async () => {
		try {
			console.log({
				code,
			});
			setIsPermitted(true);
		} catch (error) {
			console.log(error);
		}
	};
	const handleResetPassword = () => {
		navigation.navigate('Home');
	};

	return (
		<LayoutAuth>
			{!isPermitted ? (
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
							abc@gmail.com
						</Text>
					</View>
					<TextInputWithLable
						placheHolder="Code *"
						onChangeText={(code: string) => setCode(code)}
						value={undefined}
						isSecure={undefined}
						label={undefined}
					/>

					<ButtonWithLoader
						text="Reset password"
						onPress={handleSubmitCode}
						isLoading={undefined}
					/>
				</SafeAreaView>
			) : (
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
						Reset Password
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
							In order to protect your account, make sure your
							password:
						</Text>
						<Pressable
							onPress={() => navigation.navigate('Register')}
						>
							<Text
								style={{
									color: '#E36414',
									fontSize: 12,
									fontWeight: '600',
									paddingBottom: 10,
								}}
							>
								Longer than 8 characters Does not match or
								contain your username
							</Text>
						</Pressable>
					</View>
					<TextInputWithLable
						placheHolder="Password *"
						onChangeText={(password: any) =>
							updateState({ password })
						}
						value={undefined}
						secureTextEntry={true}
						label={undefined}
						isSecure={undefined}
					/>
					<TextInputWithLable
						placheHolder="Confirm password *"
						// isSecure={isSecure}
						secureTextEntry={true}
						onChangeText={(confirmPassword: any) =>
							updateState({ confirmPassword })
						}
						value={undefined}
						isSecure={undefined}
						label={undefined}
					/>
					<ButtonWithLoader
						text="Reset password"
						onPress={handleResetPassword}
						isLoading={undefined}
					/>
					<Pressable
						onPress={() => navigation.navigate('Login')}
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
							Back to Login
						</Text>
					</Pressable>
				</SafeAreaView>
			)}
		</LayoutAuth>
	);
};
export default ResetPassword;
