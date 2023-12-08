import React from 'react';
import {
	Animated,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeartButton from './HeartButton';
import type { IRoomFinding } from '@/interfaces/roomfinding.interface';
import type { IUser } from '@/interfaces/user.interface';
import { useAppSelector } from '@/redux/hook';
import { useCreateChecklistMutation } from '@/redux/services/checkList/checkList.service';
import { formatNumberWithCommas } from '@/utils/helpers';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ListingProps {
	data: IRoomFinding;
	name: string;
	navigation: NativeStackNavigationProp<any>;
	onPress: (name: string) => void;
}

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

const Listing = ({ data, onPress, name, navigation }: ListingProps) => {
	const [createChecklist] = useCreateChecklistMutation();
	const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser;

	const handleClickHeartButton = async () => {
		if (userInfo) {
			await createChecklist({
				roomId: data.id,
			});
		} else {
			navigation.navigate('/login');
		}
	};

	return (
		<Pressable onPress={() => onPress(name)} style={{ flex: 1 }}>
			<View style={styles.listing}>
				<Swiper
					style={{ height: 300 }}
					autoplay={false}
					renderPagination={CustomPagination}
					loop={false}
				>
					{data.images?.map((image, index) => (
						<RoomImage item={image} key={index} />
					))}
				</Swiper>
				<TouchableOpacity
					style={{
						position: 'absolute',
						right: 38,
						top: 12,
						padding: 7,
						borderRadius: 100,
						backgroundColor: 'white',
					}}
				>
					<HeartButton
						isInCheckList={data.isInCheckList}
						handleClickHeartButton={handleClickHeartButton}
					/>
				</TouchableOpacity>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						gap: 2,
						marginTop: 8,
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
						{data.address}, {data.district}
					</Text>
					{data.avgRate ? (
						<View style={{ flexDirection: 'row', gap: 4 }}>
							<Icon name="star" size={16} color="#000" />
							<Text
								style={{
									fontFamily: 'mon-sb',
									color: '#000',
									fontWeight: '700',
								}}
							>
								{data.avgRate}
							</Text>
						</View>
					) : (
						<Text
							style={{
								fontFamily: 'mon-sb',
								color: '#000',
								fontWeight: '700',
							}}
						></Text>
					)}
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'flex-start',
						gap: 2,
					}}
				>
					{data.utilities?.map((utilities, index) => (
						<View
							key={index}
							style={{
								padding: 3,
								borderRadius: 10,
								backgroundColor: '#D9D9D9',
								width: 24,
								height: 24,
							}}
						>
							<Image
								source={{ uri: utilities.icon }}
								style={{
									padding: 8,
								}}
							/>
						</View>
					))}
				</View>

				<View style={{ flexDirection: 'row', gap: 4 }}>
					<Text
						style={{
							fontFamily: 'mon-sb',
							color: '#000',
							fontWeight: '700',
							fontSize: 16,
						}}
					>
						VND {formatNumberWithCommas(data.price || '')}
					</Text>
					<Text style={{ fontFamily: 'mon', color: '#000' }}>
						/month
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default Listing;

const styles = StyleSheet.create({
	listing: {
		paddingHorizontal: 24,
		marginVertical: 20,
		zIndex: 100,
	},
	image: {
		width: '100%',
		height: 300,
		borderRadius: 10,
		marginBottom: 8,
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
});
