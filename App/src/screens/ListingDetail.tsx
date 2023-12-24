import React from 'react';
import {
	Animated,
	Dimensions,
	Image,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Swiper from 'react-native-swiper';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import BackButton from '@/components/BackButton';
import HeartButton from '@/components/HeartButton';
import Loading from '@/components/Loading';
import Utility from '@/components/Utility';
import type { IRoomBlock } from '@/interfaces/block.interface';
import type { IRoomDetail } from '@/interfaces/room-detail.interface';
import type { ILandlord, IUser } from '@/interfaces/user.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { useAppSelector } from '@/redux/hook';
import { useCreateChecklistMutation } from '@/redux/services/checkList/checkList.service';
import { useGetRoomDetailQuery } from '@/redux/services/room-detail/room-detail.service';
import { formatNumberWithCommas } from '@/utils/helpers';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const RoomImage = ({ item }: { item: string }) => (
	<Image source={{ uri: item }} style={styles.image} />
);
const CustomPagination = (index: number, total: number): React.ReactNode => {
	const dotOpacity = new Animated.Value(0);

	Animated.timing(dotOpacity, {
		toValue: 1,
		duration: 30,
		useNativeDriver: false,
	}).start();

	return (
		<Animated.View
			style={[
				styles.pagination,
				{
					opacity: dotOpacity,
					position: 'absolute',
					bottom: 10,
					width: '100%',
					justifyContent: 'center',
				},
			]}
		>
			{Array.from({ length: total }).map((_, i) => (
				<View
					style={[
						styles.paginationDot,
						i === index ? styles.paginationDotActive : null,
					]}
					key={i}
				/>
			))}
		</Animated.View>
	);
};

const ListingDetail = ({ navigation, route }: Props) => {
	const [createChecklist] = useCreateChecklistMutation();
	const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser;

	const handleClickHeartButton = async (id: string) => {
		if (userInfo) {
			await createChecklist({
				roomId: id,
			});
		} else {
			navigation.navigate('Login');
		}
	};
	const BackHandler = () => {
		navigation.pop();
	};

	const { data, isLoading } = useGetRoomDetailQuery({
		id: route?.params?.id,
	});

	const roomDetail = data?.data || ({} as IRoomDetail);

	const {
		id,
		price,
		isInCheckList,
		images = [],
		utilities = [],
		roomblock = {} as IRoomBlock,
		landlord = {} as ILandlord,
		ratingDetail = {
			ratings: [],
			totalRating: 0,
		},
	} = roomDetail;
	// const coordinate = roomblock?.coordinate || { latitude: 0, longitude: 0 };

	console.log(ratingDetail);
	if (isLoading) return <Loading />;
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
					<Swiper
						style={{ height: 300 }}
						autoplay={false}
						renderPagination={CustomPagination}
						loop={false}
					>
						{images?.map((image, index) => (
							<RoomImage item={image} key={index} />
						))}
					</Swiper>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 16,
							top: 16,
							padding: 7,
							borderRadius: 100,
							backgroundColor: 'white',
						}}
					>
						<HeartButton
							isInCheckList={isInCheckList}
							handleClickHeartButton={() =>
								handleClickHeartButton(id)
							}
						/>
					</TouchableOpacity>
					<View style={styles.infoContainer}>
						<Text style={styles.name}>{roomblock.address}</Text>
						<View
							style={{
								flexDirection: 'row',
								width: '100%',
								// alignItems: 'center',
								marginTop: 8,
								paddingHorizontal: 8,
								paddingBottom: 2,

								alignContent: 'flex-start',
							}}
						>
							<Icon2
								name="location"
								size={26}
								color={'#E36414'}
							/>
							<Text style={styles.location}>
								{roomblock.district}, {roomblock.city}
							</Text>
						</View>
						<Text style={styles.description}>
							{roomblock.description}
						</Text>

						{ratingDetail.totalRating ? (
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
									<Text style={styles.ratings}>
										{ratingDetail.avgRate}
									</Text>
									<View>
										<View
											style={{
												flexDirection: 'row',
												gap: 2,
											}}
										>
											{Array.from({
												length: Math.floor(
													ratingDetail.avgRate || 0,
												),
											}).map((_, index) => (
												<Icon
													key={index}
													name="star"
													size={18}
													color="#E36414"
												/>
											))}

											{(ratingDetail.avgRate || 0) -
												Math.floor(
													ratingDetail.avgRate || 0,
												) >
												0 && (
												<Icon
													name="star"
													size={18}
													style={{ width: 9 }}
													color="#E36414"
												/>
											)}
										</View>
										<View
											style={{
												flexDirection: 'row',
												gap: 2,
												position: 'absolute',
												left: 0,
												zIndex: -1,
											}}
										>
											<Icon
												name="star"
												size={18}
												color="#ccc"
											/>
											<Icon
												name="star"
												size={18}
												color="#ccc"
											/>
											<Icon
												name="star"
												size={18}
												color="#ccc"
											/>
											<Icon
												name="star"
												size={18}
												color="#ccc"
											/>
											<Icon
												name="star"
												size={18}
												color="#ccc"
											/>
										</View>
									</View>
								</View>

								<TouchableOpacity
									onPress={() => {
										navigation.navigate('Comments', {
											ratingDetail: ratingDetail,
										});
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
										<Text style={styles.ratings}>
											{ratingDetail.ratings.length}
										</Text>
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
						) : (
							<Text style={styles.description}>
								No reviews yet
							</Text>
						)}
						<View style={styles.divider} />

						<View style={styles.hostView}>
							<Image
								source={{
									uri: landlord.photo,
								}}
								style={styles.host}
							/>

							<View style={{ flex: 1 }}>
								<Text
									style={{
										fontWeight: '500',
										fontSize: 16,
										color: '#5E5D5E',
										width: '100%',
									}}
								>
									Hosted by {landlord.name}
								</Text>
								<Text
									style={{ color: '#5E5D5E', width: '100%' }}
								>
									{landlord.email} · {landlord.phoneNumber}
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
					<View style={styles.container_map}>
						<MapView
							style={{ flex: 1 }}
							initialRegion={{
								latitude:
									roomDetail.roomblock.coordinate.latitude,
								longitude:
									roomDetail.roomblock.coordinate.longitude,
								latitudeDelta: 0.1,
								longitudeDelta: 0.05,
							}}
						>
							<Marker
								coordinate={roomDetail.roomblock.coordinate}
							></Marker>
						</MapView>
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
						<Text style={styles.footerPrice}>
							VND {formatNumberWithCommas(price || '')}
						</Text>
						<Text style={{ color: '#5E5D5E', fontSize: 12 }}>
							month
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							if (userInfo) {
								navigation.navigate('PrepareContract', {
									id: id,
									overView: {
										price: price,
										image: images[0],
										totalRating: ratingDetail.totalRating,
										numberOfReviews:
											ratingDetail.ratings.length,
										district: roomblock.district,
										province: roomblock.city,
										address: roomblock.address,
									},
								});
							} else {
								navigation.navigate('Login');
							}
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
		width: '90%',
		fontSize: 20,
		fontFamily: 'mon-sb',
		color: '#000',
	},
	rooms: {
		fontSize: 14,
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
		flex: 1,
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
		fontSize: 16,
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
	swiperArrow: {
		color: '#FFF',
		fontSize: 60,
		fontWeight: '300',
	},
	pagination: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(255,255,255,0.4)',
		margin: 5,
	},
	paginationDotActive: {
		backgroundColor: '#FFF',
	},
	description: {
		fontSize: 14,
		marginTop: 10,
		fontFamily: 'mon',
		paddingHorizontal: 12,
		color: '#5E5D5E',
	},
	button_map: {
		position: 'absolute',
		top: 600,
		left: 140,
		zIndex: 100,
		backgroundColor: 'black',
		padding: 12,
		borderRadius: 100,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 20,
		gap: 6,
		alignItems: 'center',
	},
	text_map: {
		color: 'white',
		fontWeight: 'bold',
	},
	container_map: {
		height: 300,
		padding: 8,
		borderRadius: 8,
	},
});

export default ListingDetail;
