import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Search = () => {
	return (
		<View
			style={{
				backgroundColor: 'white',
				padding: 16,
				height: 220,
				width: '100%',
				position: 'absolute',
				bottom: -20 * 1.1,
				borderTopRightRadius: 20,
				borderTopLeftRadius: 20,
				zIndex: 1,
			}}
		>
			<Text>Search</Text>
		</View>
	);
};

export default Search;

const styles = StyleSheet.create({});
