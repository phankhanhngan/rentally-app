import React, { useState } from 'react';
import {
	Animated,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import type { IRoomFinding } from '@/interfaces/roomfiding.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParams, 'RoomsStack'>;

interface ListingProps {
	data: IRoomFinding;
	name: string;
	onPress: (name: string) => void;
}

const RoomImage = ({ item }: { item: string }) => (
	<Image source={{ uri: item }} style={styles.image} />
);

const CustomPagination = (
	index: number,
	total: number,
	context: Swiper,
): React.ReactNode => {
	const dotOpacity = new Animated.Value(0);

	Animated.timing(dotOpacity, {
		toValue: 1,
		duration: 300, // Thời gian animation
		useNativeDriver: false, // Sử dụng native driver để tối ưu hóa
	}).start();

	return (
		<Animated.View style={[styles.pagination, { opacity: dotOpacity }]}>
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

const Listing = ({ data, onPress, name }: ListingProps) => {
	return (
		<TouchableOpacity onPress={() => onPress(name)} style={{ flex: 1 }}>
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
					style={{ position: 'absolute', right: 38, top: 12 }}
				>
					<Icon
						name="heart"
						size={20}
						style={{
							position: 'absolute',
							right: 0,
							top: 0,
							opacity: 1,
						}}
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
						{data.address}, {data.district}
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
								width: 30,
								height: 30,
							}}
						>
							<Image
								source={{ uri: utilities.icon }}
								style={{
									padding: 12,
								}}
							/>
						</View>
					))}
				</View>
				<Text style={{ fontFamily: 'mon' }}>Vacant at Oct 23 -28</Text>
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
					<Text style={{ fontFamily: 'mon', color: '#000' }}>
						/month
					</Text>
				</View>
			</View>
		</TouchableOpacity>
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
