import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import BackButton from '@/components/BackButton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

const Map = ({ navigation }: Props) => {
	const BackHandler = () => {
		navigation.pop();
	};

	const markers = [
		{
			latitude: 16.088124,
			longitude: 108.143662,
			price: '1200000 VND',
			image: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/RoomImages/00eafc89-3583-42f9-8868-0d19ce4a7f54/16999873891891246280_16061017110043391702.jpg',
		},
		{
			latitude: 16.06804,
			longitude: 108.154239,
			price: '2000000 VND',
			image: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/RoomImages/00eafc89-3583-42f9-8868-0d19ce4a7f54/16999873891891246280_16061017110043391702.jpg',
		},
		{
			latitude: 16.067475,
			longitude: 108.157181,
			price: '2500000 VND',
			image: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/RoomImages/00eafc89-3583-42f9-8868-0d19ce4a7f54/16999873891891246280_16061017110043391702.jpg',
		},
		{
			latitude: 16.061121,
			longitude: 108.219194,
			price: '15000000 VND',
			image: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/RoomImages/00eafc89-3583-42f9-8868-0d19ce4a7f54/16999873891891246280_16061017110043391702.jpg',
		},
	];

	const mapRef = useRef<MapView>(null);
	const [isMapReady, setIsMapReady] = useState(false);

	useEffect(() => {
		if (isMapReady && mapRef.current && markers.length > 0) {
			let maxLat = markers[0].latitude;
			let minLat = markers[0].latitude;
			let maxLng = markers[0].longitude;
			let minLng = markers[0].longitude;

			markers.forEach((marker) => {
				maxLat = Math.max(maxLat, marker.latitude);
				minLat = Math.min(minLat, marker.latitude);
				maxLng = Math.max(maxLng, marker.longitude);
				minLng = Math.min(minLng, marker.longitude);
			});

			const midLat = (maxLat + minLat) / 2;
			const midLng = (maxLng + minLng) / 2;
			const deltaLat = maxLat - minLat + 0.02;
			const deltaLng = maxLng - minLng + 0.02;

			mapRef.current.fitToCoordinates(
				[
					{
						latitude: midLat - deltaLat / 2,
						longitude: midLng - deltaLng / 2,
					},
					{
						latitude: midLat + deltaLat / 2,
						longitude: midLng + deltaLng / 2,
					},
				],
				{
					edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
					animated: true,
				},
			);
		}
	}, [isMapReady, markers]);

	return (
		<View style={styles.container}>
			<BackButton onPress={BackHandler} />
			<MapView
				style={styles.map}
				ref={mapRef}
				onMapReady={() => setIsMapReady(true)}
			>
				{markers.map((marker, index) => (
					<Marker key={index} coordinate={marker}>
						<Callout tooltip>
							<View style={styles.calloutContainer}>
								<Text style={styles.calloutText}>
									{marker.price}
								</Text>
								{/* <Text style={{ height: 100, borderWidth: 1, padding: 0 }}>
                  <Image
                    resizeMode="cover"
                    style={{ width: 100, height: 100 }}
                    source={{ uri: marker.image }}
                  />
                </Text> */}
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
	calloutContainer: {
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 5,
		elevation: 4,
	},
	calloutText: {
		color: 'black',
		fontSize: 16,
	},
});

export default Map;
