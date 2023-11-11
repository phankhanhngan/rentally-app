import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';

const Home = () => {
	const mapRef = useRef();
	return (
		<View style={styles.screenContainer}>
			<ExploreHeader />
			<Listings />
			{/* <MapView
				style={styles.mapStyle}
				ref={mapRef}
				zoomControlEnabled={true}
				showsMyLocationButton={true}
				provider={PROVIDER_GOOGLE}
			></MapView> */}
		</View>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	mapStyle: {
		width: 400,
		height: 100,
	},
});

export default Home;
