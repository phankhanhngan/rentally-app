import React from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import OptionSettings from './ProfileSettings/OptionSettings';
import useRefetch from '@/hooks/useRefetch';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { logOut } from '@/redux/features/auth/auth.slice';
import { addParam } from '@/redux/features/params/params.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

const Profile = ({ navigation }: Props) => {
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((state) => state.auth.accessToken);
	const userInfo = useAppSelector((state) => state.auth.userInfo);

	const goToPersonalInformation = () => {
		navigation.navigate('PersonalInformationUpdate');
	};

	const goToLoginSecurity = () => {
		navigation.navigate('LoginSecurity');
	};
	const goToPayment = () => {
		navigation.navigate('PaymentList');
	};
	const refetch = useRefetch();

	return (
		<View style={styles.container}>
			{accessToken ? (
				<View style={styles.profile_container}>
					<View style={styles.header_container}>
						<Image
							style={styles.logo_user}
							source={{ uri: userInfo?.photo }}
						/>
						<View>
							<Text style={styles.name}>
								{userInfo?.firstName} {userInfo?.lastName}
							</Text>
							<Text style={{ color: '#A9A9A9' }}>
								Show profile
							</Text>
						</View>
					</View>

					<View style={styles.middle_container_outer}>
						<View style={styles.middle_container}>
							<View style={{ width: 200 }}>
								<Text style={styles.header_middle}>
									Rentally your place
								</Text>
								<Text>
									It's simple to get set up and start earning.
								</Text>
							</View>
							<Image
								style={styles.logo_user}
								source={require('../assets/images/rentallyLogo.png')}
							/>
						</View>
					</View>
					<View style={styles.settings_container}>
						<Text style={styles.header_settings}>Settings</Text>
						<OptionSettings
							icon="user-o"
							content="Personal information"
							iconName="Icon"
							event={goToPersonalInformation}
						/>
						<OptionSettings
							icon="lock"
							content="Login & security"
							iconName="Feather"
							event={goToLoginSecurity}
						/>
						<OptionSettings
							icon="credit-card"
							content="Payments and payouts"
							iconName="Icon"
							event={goToPayment}
						/>
					</View>
					<View style={styles.logout_container}>
						<Pressable
							onPress={async () => {
								dispatch(logOut(''))
									.unwrap()
									.then(() => {
										dispatch(
											addParam({
												name: 'page',
												values: [1],
											}),
										);
										refetch();
									});

								navigation.navigate('Login');
							}}
						>
							<Text style={styles.logout_text}>Logout</Text>
						</Pressable>
					</View>
				</View>
			) : (
				<View style={styles.not_login_container}>
					<Text style={styles.notify}>
						Please log in to experience the best service.
					</Text>
					<TouchableOpacity
						style={styles.login_button}
						onPress={() => {
							navigation.navigate('Login');
						}}
					>
						<Text style={styles.login_text}>Login</Text>
					</TouchableOpacity>
					<View style={styles.register_container}>
						<Text style={styles.question}>
							Do not have an account?
						</Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Register');
							}}
						>
							<Text style={styles.register_text}>Register</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profile_container: {
		backgroundColor: 'white',
		padding: 16,
		flex: 1,
	},
	header_container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		backgroundColor: 'white',
		borderBottomWidth: 1.5,
		borderBottomColor: '#F1EFEF',
	},
	logo_user: {
		width: 54,
		height: 54,
		marginRight: 16,
		borderRadius: 50,
	},
	name: {
		fontSize: 18,
	},
	middle_container_outer: {
		marginTop: 24,
		marginBottom: 32,
		borderRadius: 18, // Độ cong ngoài cùng
		overflow: 'hidden', // Ẩn nội dung vượt ra ngoài
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	middle_container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 24,
		paddingLeft: 16,
		paddingRight: 16,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	header_middle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	settings_container: {},
	header_settings: {
		fontSize: 24,
		fontWeight: '500',
		marginBottom: 24,
	},
	personal_left: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon_user: {
		marginRight: 16,
	},
	name_personal: {
		fontSize: 18,
		color: 'grey',
	},
	container_settings: {
		backgroundColor: 'white',
		borderBottomColor: '#A9A9A9',
		borderBottomWidth: 1,
		padding: 2,
		paddingBottom: 16,
		paddingTop: 16,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	options: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginRight: 8,
	},
	content: {
		fontSize: 18,
		color: 'grey',
	},
	logout_container: {
		marginTop: 16,
		paddingBottom: 16,
		paddingTop: 16,
		borderBottomWidth: 1.5,
		borderBottomColor: '#F1EFEF',
	},
	logout_text: {
		fontSize: 16,
		fontWeight: '500',
		textDecorationLine: 'underline',
	},
	not_login_container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 20,
		alignItems: 'center',
	},
	notify: {
		fontSize: 16,
		color: 'grey',
	},
	login_button: {
		backgroundColor: '#E36414',
		width: 300,
		alignItems: 'center',
		padding: 16,
		borderRadius: 8,
		marginTop: 32,
	},
	login_text: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500',
	},
	question: {
		color: 'grey',
		fontSize: 16,
		marginRight: 16,
	},
	register_container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 16,
	},
	register_text: {
		color: 'black',
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
});
