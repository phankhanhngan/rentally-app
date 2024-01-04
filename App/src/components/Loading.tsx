import React from 'react';
import { Image, View } from 'react-native';

import LottieView from 'lottie-react-native';
const Loading = () => {
	return (
		<View
			style={{
				width: '100%',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<Image
				source={require('../assets/images/rentallyLogo.png')}
				style={{ width: 60, height: 60 }}
			/>
			<LottieView
				style={{
					width: 400,
					height: 200,
				}}
				source={require('../assets/images/loading.json')}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Loading;
