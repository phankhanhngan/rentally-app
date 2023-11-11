import { useRef } from 'react';
import React from 'react';
import type { ListRenderItem } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';

import type { BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const RenderRow = () => (
	<TouchableOpacity>
		<Animated.View
			style={styles.listing}
			entering={FadeInRight}
			exiting={FadeOutLeft}
		>
			<Animated.Image
				source={{
					uri: 'https://th.bing.com/th/id/R.ca0c98d28436a9dd24fa2a731f803a8c?rik=G7kmhnUepsoVAg&riu=http%3a%2f%2fwww.ulinemotel.com.tw%2fwp-content%2fuploads%2f2018%2f04%2frooms01.jpg&ehk=eDUElJNqgufGcHXZmbu4SUPfqkQ0ig6m9t1hY4v8Y9g%3d&risl=&pid=ImgRaw&r=0',
				}}
				style={styles.image}
			/>
			<TouchableOpacity
				style={{ position: 'absolute', right: 30, top: 30 }}
			></TouchableOpacity>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text style={{ fontSize: 16, fontFamily: 'mon-sb' }}>
					Hoang
				</Text>
				<View style={{ flexDirection: 'row', gap: 4 }}>
					<Text style={{ fontFamily: 'mon-sb' }}>20</Text>
				</View>
			</View>
			<Text style={{ fontFamily: 'mon' }}>single</Text>
			<View style={{ flexDirection: 'row', gap: 4 }}>
				<Text style={{ fontFamily: 'mon-sb' }}>€ 1000</Text>
				<Text style={{ fontFamily: 'mon' }}>night</Text>
			</View>
		</Animated.View>
	</TouchableOpacity>
);
const Listings = () => {
	const listRef = useRef<BottomSheetFlatListMethods>(null);

	// Render one listing row for the FlatList

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#FDFFFF',
			}}
		>
			<RenderRow />
		</View>
	);
};

const styles = StyleSheet.create({
	listing: {
		padding: 16,
		gap: 10,
		marginVertical: 16,
	},
	image: {
		width: '100%',
		height: 300,
		borderRadius: 10,
	},
	info: {
		textAlign: 'center',
		fontFamily: 'mon-sb',
		fontSize: 16,
		marginTop: 4,
	},
});

export default Listings;
