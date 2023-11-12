import React from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const ListingDetail = () => {
	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{ paddingBottom: 100 }}
				scrollEventThrottle={16}
			>
				<Image
					source={{
						uri: 'https://a0.muscache.com/im/pictures/miso/Hosting-721540609203378406/original/9dfaf7d6-40f2-4673-b468-7c5ab3147f86.jpeg?im_w=720',
					}}
					style={[styles.image]}
					resizeMode="cover"
				/>

				<View style={styles.infoContainer}>
					<Text style={styles.name}>Hoang</Text>
					<Text style={styles.location}>in</Text>
					<Text style={styles.rooms}>
						guests · bedrooms ·bed · bathrooms
					</Text>
					<View style={{ flexDirection: 'row', gap: 4 }}>
						<Text style={styles.ratings}>reviews</Text>
					</View>
					<View style={styles.divider} />

					<View style={styles.hostView}>
						<Image
							source={{
								uri: 'https://a0.muscache.com/im/pictures/miso/Hosting-721540609203378406/original/9dfaf7d6-40f2-4673-b468-7c5ab3147f86.jpeg?im_w=720',
							}}
							style={styles.host}
						/>

						<View>
							<Text style={{ fontWeight: '500', fontSize: 16 }}>
								Hosted by
							</Text>
							<Text>Host since </Text>
						</View>
					</View>

					<View style={styles.divider} />

					<Text style={styles.description}>hahahhahahahhaha</Text>
				</View>
			</ScrollView>

			<View
				style={{
					position: 'absolute',
					height: 100,
					bottom: 0,
					left: 0,
					right: 0,
					backgroundColor: '#fff',
					paddingVertical: 10,
					paddingHorizontal: 20,
					borderTopColor: '#5E5D5E',
					borderTopWidth: StyleSheet.hairlineWidth,
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<TouchableOpacity style={styles.footerText}>
						<Text style={styles.footerPrice}>€ 1000</Text>
						<Text>night</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[
							{
								backgroundColor: '#E36414',
								height: 50,
								borderRadius: 8,
								justifyContent: 'center',
								alignItems: 'center',
							},
							{ paddingRight: 20, paddingLeft: 20 },
						]}
					>
						<Text
							style={{
								color: '#fff',
								fontSize: 16,
								fontFamily: 'mon-b',
							}}
						>
							Reserve
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	image: {
		height: IMG_HEIGHT,
		width: width,
	},
	infoContainer: {
		padding: 24,
		backgroundColor: '#fff',
	},
	name: {
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'mon-sb',
	},
	location: {
		fontSize: 18,
		marginTop: 10,
		fontFamily: 'mon-sb',
	},
	rooms: {
		fontSize: 16,
		color: '#5E5D5E',
		marginVertical: 4,
		fontFamily: 'mon',
	},
	ratings: {
		fontSize: 16,
		fontFamily: 'mon-sb',
	},
	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#5E5D5E',
		marginVertical: 16,
	},
	host: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: '#5E5D5E',
	},
	hostView: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	footerText: {
		height: '100%',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	footerPrice: {
		fontSize: 18,
		fontFamily: 'mon-sb',
	},
	roundButton: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#E36414',
	},
	bar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	header: {
		backgroundColor: '#fff',
		height: 100,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#5E5D5E',
	},

	description: {
		fontSize: 16,
		marginTop: 10,
		fontFamily: 'mon',
	},
});

export default ListingDetail;
