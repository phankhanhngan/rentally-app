import React from 'react';
import {
	Dimensions,
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import BackButton from '@/components/BackButton';
import Utility from '@/components/Utility';
import type { IUtiltity } from '@/interfaces/utility.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

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

const ListingDetail = ({ navigation }: Props) => {
	const BackHandler = () => {
		navigation.pop();
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={'#0C0F14'} />
			<BackButton onPress={BackHandler} />

			<View style={{ position: 'relative' }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
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
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 8,
								paddingHorizontal: 8,
							}}
						>
							<Icon2
								name="location"
								size={26}
								color={'#E36414'}
							/>
							<Text style={styles.location}>
								West Virginia, Port Ignacio
							</Text>
						</View>
						<Text style={styles.description}>
							Green Ribbon Villa is a perfect getaway spot to
							celebrate big parties and lifetime events! It is
							located only 4 minutes from 54-hole Phoenix Golf
							Resort and 1 hour from Hanoi. The villa is located
							on its 13,000 m² land with high quality services and
							facilities. To name a few of the villa's facilities,
							there are private tennis court, private mountain
							cave, outdoor hut on mountain, BBQ grill, daily
							housekeeping.
						</Text>
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
									<Icon
										name="star"
										size={18}
										color="#E36414"
									/>
									<Icon
										name="star"
										size={18}
										color="#E36414"
									/>
									<Icon
										name="star"
										size={18}
										color="#E36414"
									/>
									<Icon
										name="star"
										size={18}
										color="#E36414"
									/>
									<Icon
										name="star"
										size={18}
										color="#E36414"
									/>
								</View>
							</View>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Comments');
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
							</TouchableOpacity>
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
								<Text
									style={{
										fontWeight: '500',
										fontSize: 16,
										color: '#5E5D5E',
									}}
								>
									Hosted by HoangDeptrai
								</Text>
								<Text style={{ color: '#5E5D5E' }}>
									admin@gmail.com · 0852336242{' '}
								</Text>
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
			</View>

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
						<Text style={{ color: '#5E5D5E' }}> month</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate('PrepareContract');
						}}
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
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'mon-sb',
		color: '#000',
		paddingHorizontal: 12,
		paddingTop: 12,
	},
	location: {
		fontSize: 20,

		fontFamily: 'mon-sb',

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
	// header: {
	// 	backgroundColor: '#fff',
	// 	height: 100,
	// 	borderBottomWidth: StyleSheet.hairlineWidth,
	// 	borderColor: '#5E5D5E',
	// },

	description: {
		fontSize: 14,
		marginTop: 10,
		fontFamily: 'mon',
		paddingHorizontal: 12,
		color: '#5E5D5E',
	},
});

export default ListingDetail;
