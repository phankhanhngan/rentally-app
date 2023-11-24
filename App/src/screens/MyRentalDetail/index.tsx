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

import HostInfo from './Components/HostInfo';
import RentalInfo from './Components/RentalInfo';
import BackButton from '@/components/BackButton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

import { STATUS, STATUS_COLORS, STATUS_TEXT } from '@/utils/constants';

const StatusText = ({ rentalStatus }: { rentalStatus: STATUS }) => (
	<Text
		style={{
			color: STATUS_COLORS[rentalStatus] as string,
			fontSize: 14,
			fontWeight: '700',
			textAlign: 'right',
		}}
	>
		{rentalStatus}
	</Text>
);

const ActionButton = ({ rentalStatus }: { rentalStatus: STATUS }) => {
	if (rentalStatus === STATUS.COMPLETED || rentalStatus === STATUS.APPROVED)
		return (
			<TouchableOpacity
				style={[
					{
						backgroundColor: STATUS_COLORS[rentalStatus] as string,

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
					{STATUS_TEXT[rentalStatus]}
				</Text>
			</TouchableOpacity>
		);
	return (
		<View
			style={[
				{
					height: 40,
					justifyContent: 'center',
					alignItems: 'center',
				},
				{ paddingRight: 20, paddingLeft: 20 },
			]}
		>
			<Text
				style={{ color: '#5E5D5E', fontSize: 16, alignItems: 'center' }}
			>
				{STATUS_TEXT[rentalStatus]}
			</Text>
		</View>
	);
};

const MyRentalDetail = ({ navigation }: Props) => {
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
						<StatusText rentalStatus={STATUS.COMPLETED} />
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								navigation.navigate('Room', { id: '' });
							}}
						>
							<Text style={styles.name}>467 Mraz Avenue</Text>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								marginTop: 8,
								paddingBottom: 2,
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

						<View style={styles.divider} />
						<RentalInfo />
						<View style={styles.divider} />
						<HostInfo />
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
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}
				>
					<ActionButton rentalStatus={STATUS.COMPLETED} />
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

export default MyRentalDetail;
