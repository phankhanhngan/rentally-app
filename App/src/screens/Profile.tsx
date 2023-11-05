import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { logOut } from '@/redux/features/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((state) => state.auth.accessToken);

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
		</View>
	);
};

export default Profile;
