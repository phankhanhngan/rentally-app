import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
			<LottieView
				style={{
					width: 300,
					height: 300,
				}}
				source={require('../assets/images/loading.json')}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Loading;


