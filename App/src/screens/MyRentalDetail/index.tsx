import React, { useState } from 'react';
import {
	Alert,
	Dimensions,
	Image,
	Modal,
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
type Props = NativeStackScreenProps<RootStackParams, 'Rental'>;

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

import Spinner from 'react-native-loading-spinner-overlay';
import WebView from 'react-native-webview';

import ButtonWithLoader from '@/components/ButtonWithLoader';
import {
	useConfirmRentalMutation,
	useGetMyRentalQuery,
	useRequestBreakRentalMutation,
} from '@/redux/services/rental/rental.service';
// import { useRetalRequestMutation } from '@/redux/services/rental/rental.service';
import { RATING_STATUS } from '@/utils/constants';
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

const ActionButton = ({
	rentalStatus,
	id,
	ratingStatus,
	navigation,
}: {
	rentalStatus: STATUS;
	id: string;
	ratingStatus: RATING_STATUS;
	navigation: any;
}) => {
	const [confirmRental, { isLoading: isConfirmLoading }] =
		useConfirmRentalMutation();
	const [requestBreakRental, { isLoading }] = useRequestBreakRentalMutation();

	const { refetch } = useGetMyRentalQuery(STATUS.APPROVED);
	const { refetch: refetch2 } = useGetMyRentalQuery(STATUS.COMPLETED);

	const [modalVisible, setModalVisible] = useState(false);
	const [urlPayment, setUrlPayment] = useState('');
	const handleRequest = async () => {
		try {
			if (rentalStatus === STATUS.APPROVED) {
				const res = await confirmRental({ id }).unwrap();
				setModalVisible(true);
				setUrlPayment(res.data);
				console.log('res:', res);
			} else {
				await requestBreakRental({ id });
			}
			navigation.pop();
		} catch (error: any) {
			console.log(error);
			Alert.alert('error!', error.data.message);
		}
	};

	if (rentalStatus === STATUS.COMPLETED || rentalStatus === STATUS.APPROVED)
		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignContent: 'center',
					gap: 40,
				}}
			>
				<Spinner visible={isLoading || isConfirmLoading} />
				{rentalStatus === STATUS.COMPLETED &&
					ratingStatus === RATING_STATUS.NONE && (
						<TouchableOpacity
							onPress={() => {
								console.log('review');
							}}
							style={[
								{
									backgroundColor: '#27ae60',
									height: 40,
									marginTop: 5,
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
								Review
							</Text>
						</TouchableOpacity>
					)}
				<TouchableOpacity
					onPress={handleRequest}
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
						{STATUS_TEXT[rentalStatus]}
					</Text>
				</TouchableOpacity>
				<Modal
					animationType="slide"
					transparent={false}
					visible={modalVisible}
					// onRequestClose={() => setModalVisible(false)}
				>
					<WebView
						source={{
							uri: urlPayment,
						}}
					/>
					<View
						style={{
							width: '100%',
							justifyContent: 'center',
							flexDirection: 'row',
						}}
					>
						<ButtonWithLoader
							onPress={() => {
								setModalVisible(false);
								refetch();
								refetch2();
							}}
							text="Close"
						/>
					</View>
				</Modal>
			</View>
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

const MyRentalDetail = ({ navigation, route }: Props) => {
	const myRental = route.params.myRental;
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
							uri:
								myRental.roomInfo.images &&
								(myRental.roomInfo.images[0] as string),
						}}
						style={[styles.image]}
						resizeMode="cover"
					/>

					<View style={styles.infoContainer}>
						<StatusText rentalStatus={myRental.status} />
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								navigation.navigate('Room', {
									id: myRental.roomInfo.id || '',
								});
							}}
						>
							<Text style={styles.name}>
								{myRental.roomInfo.roomName}
							</Text>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: 'row',
								// alignItems: 'center',
								marginTop: 8,
								paddingHorizontal: 8,
								paddingBottom: 2,
							}}
						>
							<Icon2
								name="location"
								size={26}
								color={'#E36414'}
							/>
							<Text style={styles.location}>
								{myRental.roomBlockInfo.district},{' '}
								{myRental.roomBlockInfo.city}
							</Text>
						</View>

						<View style={styles.divider} />
						<RentalInfo
							rentalInfo={myRental.rentalInfo}
							price={myRental.roomInfo.price}
							depositAmount={myRental.roomInfo.depositAmount}
						/>
						<View style={styles.divider} />
						<HostInfo hostInfo={myRental.hostInfo} />
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
					<ActionButton
						ratingStatus={myRental.rentalInfo.ratingStatus}
						rentalStatus={myRental.status}
						id={myRental.rentalInfo.id || ''}
						navigation
					/>
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
