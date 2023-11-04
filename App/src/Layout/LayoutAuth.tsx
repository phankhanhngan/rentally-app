import type { PropsWithChildren } from 'react';
import React from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from 'react-native';

import CloudyMobile from '../assets/images/CloudyMobile.svg';
import Logo from '../assets/images/Logo.svg';

const LayoutAuth: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<KeyboardAvoidingView
			style={{
				flex: 1,
				backgroundColor: 'white',
			}}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView>
				<View
					style={{
						alignItems: 'center',
						height: 300,
						backgroundColor: '#1D5868',
					}}
				>
					<View>
						<Text
							style={{
								fontSize: 24,
								fontWeight: '500',
								marginTop: 16,
								marginLeft: 6,
								color: '#E36414',
							}}
						>
							Finding a
						</Text>
						<Text
							style={{
								fontSize: 24,
								fontWeight: '500',
								marginLeft: 6,
								color: '#E36414',
							}}
						>
							dream room to rent?
						</Text>
						<Text
							style={{
								fontSize: 16,
								fontWeight: '300',
								color: 'white',
								marginTop: -2,
							}}
						>
							Create your account and start exploration with us
						</Text>
					</View>

					<Logo width={260} height={160} style={{ marginTop: -20 }} />
					<CloudyMobile
						width={800}
						height={290}
						style={{ marginTop: -40 }}
					/>
				</View>
				<SafeAreaView
					style={{
						backgroundColor: 'white',
						alignItems: 'center',
					}}
				>
					<Image
						source={require('../assets/images/rentallyLogo.png')}
						style={{ width: 60, height: 60, marginTop: 10 }}
					/>
					<View>{children}</View>
				</SafeAreaView>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default LayoutAuth;
