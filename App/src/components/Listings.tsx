import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RenderRow = () => (
	<View style={styles.listing}>
		<Image
			source={{
				uri: 'https://th.bing.com/th/id/R.ca0c98d28436a9dd24fa2a731f803a8c?rik=G7kmhnUepsoVAg&riu=http%3a%2f%2fwww.ulinemotel.com.tw%2fwp-content%2fuploads%2f2018%2f04%2frooms01.jpg&ehk=eDUElJNqgufGcHXZmbu4SUPfqkQ0ig6m9t1hY4v8Y9g%3d&risl=&pid=ImgRaw&r=0',
			}}
			style={styles.image}
		/>

		<TouchableOpacity style={{ position: 'absolute', right: 38, top: 12 }}>
			<Icon
				name="heart"
				size={20}
				// color="#ccc"
				style={{ position: 'absolute', right: 0, top: 0, opacity: 10 }}
			/>
		</TouchableOpacity>
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				gap: 2,
			}}
		>
			<Text
				style={{
					fontSize: 14,
					fontFamily: 'mon-sb',
					color: '#000',
					fontWeight: '700',
				}}
			>
				Nguyen Luong Bang, Lien Chieu
			</Text>

			<View style={{ flexDirection: 'row', gap: 4 }}>
				<Icon name="star" size={16} color="#000" />
				<Text
					style={{
						fontFamily: 'mon-sb',
						color: '#000',
						fontWeight: '700',
					}}
				>
					4.8
				</Text>
			</View>
		</View>
		<Text style={{ fontFamily: 'mon' }}>single</Text>
		<View style={{ flexDirection: 'row', gap: 4 }}>
			<Text
				style={{
					fontFamily: 'mon-sb',
					color: '#000',
					fontWeight: '700',
					fontSize: 16,
				}}
			>
				€ 1000
			</Text>
			<Text style={{ fontFamily: 'mon', color: '#000' }}>/month</Text>
		</View>
	</View>
);
const Listings = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#FDFFFF',
			}}
		>
			<RenderRow />
			<RenderRow />
			<RenderRow />
			<RenderRow />
			<RenderRow />
		</View>
	);
};

const styles = StyleSheet.create({
	listing: {
		paddingHorizontal: 24,
		marginVertical: 20,
	},
	image: {
		width: '100%',
		height: 300,
		borderRadius: 10,
		marginBottom: 8,
	},
	info: {
		textAlign: 'center',
		fontFamily: 'mon-sb',
		fontSize: 16,
		marginTop: 4,
	},
});

export default Listings;
