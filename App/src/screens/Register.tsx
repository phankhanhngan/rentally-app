import React, { useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Pressable,
	SafeAreaView,
	Text,
	View,
} from 'react-native';

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
import { Picker } from '@react-native-picker/picker';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
	const navigation = useNavigation();
	const [selectedLanguage, setSelectedLanguage] = useState();

	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				style={{
					backgroundColor: 'white',
					alignItems: 'center',
				}}
			>
				<Image
					source={require('../assets/images/rentallyLogo.png')}
					style={{ width: 60, height: 60, marginTop: 20 }}
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
									Login now{' '}
								</Text>
							</Pressable>
						</View>
						<TextInputWithLable
							placheHolder="Email *"
							onChangeText={() => {}}
							value={undefined}
							isSecure={undefined}
							label={undefined}
						/>
						<TextInputWithLable
							placheHolder="Password *"
							// isSecure={isSecure}
							secureTextEntry={true}
							onChangeText={() => {}}
							value={undefined}
							isSecure={undefined}
							label={undefined}
						/>
						<TextInputWithLable
							placheHolder="Confirm password *"
							// isSecure={isSecure}
							secureTextEntry={true}
							onChangeText={() => {}}
							value={undefined}
							isSecure={undefined}
							label={undefined}
						/>
						<TextInputWithLable
							placheHolder="Firstname *"
							// isSecure={isSecure}
							secureTextEntry={false}
							onChangeText={() => {}}
							value={undefined}
							isSecure={undefined}
							label={undefined}
						/>
						<TextInputWithLable
							placheHolder="Lastname *"
							// isSecure={isSecure}
							secureTextEntry={false}
							onChangeText={() => {}}
							value={undefined}
							isSecure={undefined}
							label={undefined}
						/>
						<TextInputWithLable
							placheHolder="Phone number *"
							// isSecure={isSecure}
							secureTextEntry={false}
							onChangeText={() => {}}
							value={undefined}
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
						<Picker
							selectedValue={selectedLanguage}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedLanguage(itemValue)
							}
						>
							<Picker.Item label="Java" value="java" />
							<Picker.Item label="JavaScript" value="js" />
						</Picker>
						<ButtonWithLoader
							text="Register"
							onPress={() => {}}
							isLoading={undefined}
						/>
					</SafeAreaView>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Register;
