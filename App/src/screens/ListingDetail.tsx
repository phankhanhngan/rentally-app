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
import Icon from 'react-native-vector-icons/FontAwesome';

import Utility from '@/components/Utility';
import type { IUtiltity } from '@/interfaces/utility.interface';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const utilities: IUtiltity[] = [
	{
		id: 1,
		name: 'Electricity',
		note: 'Power supply for the property',
		icon: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/utilities/Electricity.png',
	},
	{
		id: 2,
		name: 'Water',
		note: 'Hot and cold water supply',
		icon: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/utilities/Water.png',
	},
	{
		id: 4,
		name: 'Gas',
		note: 'Natural gas supply',
		icon: 'https://image-user-public.s3.ap-southeast-2.amazonaws.com/utilities/Gas.png',
	},
];

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
					<Text style={styles.name}>467 Mraz Avenue</Text>
					<Text style={styles.location}>
						West Virginia, Port Ignacio
					</Text>
					<Text style={styles.description}>hahahhahahahhaha</Text>
					<View
						style={{
							flexDirection: 'row',
							gap: 4,
							marginTop: 16,
							borderRadius: 10,
							width: '100%',
							padding: 16,
							borderColor: '#ccc',
							borderWidth: 1,
							justifyContent: 'space-between',
						}}
					>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 6,
							}}
						>
							<Text style={styles.ratings}>5.0</Text>
							<View style={{ flexDirection: 'row', gap: 2 }}>
								<Icon name="star" size={18} color="#000" />
								<Icon name="star" size={18} color="#000" />
								<Icon name="star" size={18} color="#000" />
								<Icon name="star" size={18} color="#000" />
								<Icon name="star" size={18} color="#000" />
							</View>
						</View>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 6,
							}}
						>
							<Text style={styles.ratings}>6</Text>
							<Text
								style={{
									fontSize: 16,
									fontFamily: 'mon-sb',
									color: '#000',
									fontWeight: 'bold',
									textDecorationLine: 'underline',
								}}
							>
								Reviews
							</Text>
						</View>
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
								Hosted by HoangDeptrai
							</Text>
							<Text>admin@gmail.com · 0852336242 </Text>
						</View>
					</View>

					<View style={styles.divider} />
					<View style={{ gap: 12, flexDirection: 'column' }}>
						{utilities.map((ultility) => (
							<Utility key={ultility.id} utility={ultility} />
						))}
					</View>
				</View>
			</ScrollView>

			<View
				style={{
					position: 'absolute',
					height: 70,
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
						<Text> month</Text>
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
							Prepare contract
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
		padding: 12,
		backgroundColor: '#fff',
	},
	name: {
		fontSize: 26,
		fontWeight: 'bold',
		fontFamily: 'mon-sb',
		color: '#000',
		paddingHorizontal: 12,
		paddingTop: 12,
	},
	location: {
		fontSize: 20,
		marginTop: 10,
		fontFamily: 'mon-sb',
		paddingHorizontal: 12,

		color: '#000',
	},
	rooms: {
		fontSize: 16,
		color: '#5E5D5E',
		marginVertical: 4,
		fontFamily: 'mon',
	},
	ratings: {
		fontSize: 18,
		fontFamily: 'mon-sb',
		color: '#000',
		fontWeight: 'bold',
	},
	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#5E5D5E',
		marginVertical: 16,
		marginHorizontal: 12,
	},
	host: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: '#5E5D5E',
		paddingHorizontal: 12,
	},
	hostView: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		paddingHorizontal: 12,
	},
	footerText: {
		height: '100%',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	footerPrice: {
		color: '#000',
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
		paddingHorizontal: 12,
	},
});

export default ListingDetail;
