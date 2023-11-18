import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Loading = () => {
	return (
		<View
			style={{
				width: '100%',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text style={{ color: '#E36414', fontWeight: '700', fontSize: 30 }}>
				Loading...
			</Text>
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({});
