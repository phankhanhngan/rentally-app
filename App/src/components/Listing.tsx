import React from 'react';
import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
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

const RoomImage = ({ item, index }: { item: string; index: number }) => (
	<Image source={{ uri: item }} style={styles.image} />
);

const Listing = ({ data, onPress, name }: ListingProps) => (
	<TouchableOpacity onPress={() => onPress(name)}>
		<View style={styles.listing}>
			<Carousel
				layout={'default'}
				data={data.images}
				sliderWidth={Dimensions.get('window').width - 48}
				itemWidth={Dimensions.get('window').width - 48}
				renderItem={RoomImage}
			/>
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
	</TouchableOpacity>
);

export default Listing;

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
