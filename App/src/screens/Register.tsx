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

import ButtonWithLoader from '../components/ButtonWithLoader';
import TextInputWithLable from '../components/TextInputWithLabel';
// import { showError } from '../utils/helperFunction';
import { useNavigation } from '@react-navigation/native';

const data = [
	{ label: 'Item 1', value: '1' },
	{ label: 'Item 2', value: '2' },
	{ label: 'Item 3', value: '3' },
	{ label: 'Item 4', value: '4' },
	{ label: 'Item 5', value: '5' },
	{ label: 'Item 6', value: '6' },
	{ label: 'Item 7', value: '7' },
	{ label: 'Item 8', value: '8' },
];
const Register = () => {
	const navigation = useNavigation();
	const [value, setValue] = React.useState('key1');
	const ref = useRef<IDropdownRef>(null);
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
					style={{ width: 60, height: 60, marginTop: 30 }}
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
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								inputSearchStyle={styles.inputSearchStyle}
								iconStyle={styles.iconStyle}
								data={data}
								search
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder="Dropdown 2"
								searchPlaceholder="Search..."
								value={value}
								onChange={(item) => {
									setValue(item.value);
								}}
								// eslint-disable-next-line @typescript-eslint/no-empty-function
								onChangeText={() => {}} // Keep search keyword
							/>
						</View>

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
