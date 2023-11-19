import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import { logOut } from '@/redux/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const userInfo = useAppSelector((state) => state.auth.accessToken);
  
  const markers = [
    { latitude: 16.088124, longitude: 108.143662, price: "$50" },
    { latitude: 16.06804, longitude: 108.154239, price: "$80" },
    { latitude: 16.067475, longitude: 108.157181, price: "$65" },
    { latitude: 16.061121, longitude: 108.219194, price: "$90" },
  ];

	return (
		<View>
			<Text>
				{accessToken ? (
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
							Logout{' '}
						</Text>
					</Pressable>
				) : (
					<Pressable
						onPress={() => {
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
			</Text>
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE} // remove if not using Google Maps
					style={styles.map}
					region={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}
				></MapView>
			</View>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// ...StyleSheet.absoluteFillObject,
		// height: 400,
		// width: 400,
		// justifyContent: 'flex-end',
		// alignItems: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
