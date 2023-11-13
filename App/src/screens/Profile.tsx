import React, { useEffect } from 'react';
import {
	Alert,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import ButtonWithLoader from '@/components/ButtonWithLoader';
import type {
	IUpdateUser,
	IUpdateUseresponse,
} from '@/interfaces/user.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { logOut } from '@/redux/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useUpdateMeMutation } from '@/redux/services/user/user-profile.service';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';

const Profile = () => {
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((state) => state.auth.accessToken);
	const user = useAppSelector((state) => state.auth.userInfo);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParams>>();

	const [update, updateResult] = useUpdateMeMutation();

	useEffect(() => {
		if (updateResult.data?.status === 'SUCCESS') {
			navigation.replace('Profile');
		}
		if (updateResult.error && 'data' in updateResult.error) {
			Alert.alert(
				'Update information error!',
				(updateResult.error?.data as IUpdateUseresponse)?.message,
			);
		}
	}, [updateResult]);

	const handleSubmit = async (values: IUpdateUser) => {
		console.log(values);
		await update(values).unwrap();
	};

	const handlePress = () => {};

	const initialValues: IUpdateUser = {
		firstName: user?.firstName,
		lastName: user?.lastName,
		phoneNumber: user?.phoneNumber,
		photo: user?.photo,
	};

	return (
		<View style={styles.container}>
			{accessToken ? (
				<View>
					<Formik
						initialValues={initialValues}
						// validate={}
						onSubmit={handleSubmit}
					>
						{(formik) => {
							const { values, handleChange, handleSubmit } =
								formik;
							return (
								<View style={styles.profileContainer}>
									<TouchableOpacity onPress={handlePress}>
										{user?.photo ? (
											<Image
												source={{ uri: user?.photo }}
												style={styles.profileImage}
											/>
										) : (
											<View
												style={
													styles.profilePlaceholder
												}
											>
												<Text
													style={
														styles.placeholderText
													}
												>
													Choose Photo
												</Text>
											</View>
										)}
									</TouchableOpacity>
									<View style={styles.row}>
										<View style={styles.inputContainer}>
											<Text style={styles.label}>
												First Name:
											</Text>
											<TextInput
												style={styles.input}
												placeholder="Enter your first name"
												value={values.firstName}
												onChangeText={handleChange(
													'firstName',
												)}
											/>
										</View>
									</View>
									<View style={styles.row}>
										<View style={styles.inputContainer}>
											<Text style={styles.label}>
												Last Name:
											</Text>
											<TextInput
												style={styles.input}
												placeholder="Enter your last name"
												value={values.lastName}
												onChangeText={handleChange(
													'lastName',
												)}
											/>
										</View>
									</View>
									<View style={styles.row}>
										<View style={styles.inputContainer}>
											<Text style={styles.label}>
												Phone Number:
											</Text>
											<TextInput
												style={styles.input}
												placeholder="Enter your phone number"
												value={values.phoneNumber}
												onChangeText={handleChange(
													'phoneNumber',
												)}
											/>
										</View>
									</View>
									<View style={styles.row}>
										<View style={styles.inputContainer}>
											<Text style={styles.label}>
												Email:
											</Text>
											<TextInput
												editable={false}
												selectTextOnFocus={false}
												style={[
													styles.input,
													{
														backgroundColor:
															'#d9d9d9',
													},
												]}
												placeholder="Your email"
												value={user?.email}
											/>
										</View>
									</View>
									<ButtonWithLoader
										text="Save"
										onPress={handleSubmit}
										isLoading={undefined}
									/>
								</View>
							);
						}}
					</Formik>
				</View>
			) : (
				<Pressable
					onPress={() => {
						dispatch(logOut());
						navigation.navigate('Login');
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
						Login{' '}
					</Text>
				</Pressable>
			)}
		</View>
	);
};

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
	},
	profileContainer: {
		alignItems: 'center',
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 75,
	},
	profilePlaceholder: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: '#cccccc',
		justifyContent: 'center',
		alignItems: 'center',
	},
	placeholderText: {
		color: '#ffffff',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
	},
	inputContainer: {
		flex: 1,
		marginLeft: 45,
		marginTop: 10,
		marginBottom: 10,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'black',
	},
	input: {
		height: 48,
		width: 320,
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#E1E6EF',
		color: 'black',
		paddingHorizontal: 12,
		backgroundColor: '#F1F3F9',
	},
	saveButton: {
		marginTop: 20,
		marginLeft: 16,
		marginRight: 16,
		backgroundColor: '#E36414',
		padding: 15,
		borderRadius: 10,
		alignSelf: 'stretch',
		alignItems: 'center',
	},
	saveButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default Profile;
