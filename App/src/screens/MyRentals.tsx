import React, { useState } from 'react';
import {
	Alert,
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import WebView from 'react-native-webview';

import { AuthRequirement } from '@/components/AuthRequirement';
import ButtonWithLoader from '@/components/ButtonWithLoader';
import Loading from '@/components/Loading';
import { Skeleton } from '@/components/Skeleton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { useAppSelector } from '@/redux/hook';
import {
	useConfirmRentalMutation,
	useGetMyRentalQuery,
	useRequestBreakRentalMutation,
} from '@/redux/services/rental/rental.service';
import { RATING_STATUS } from '@/utils/constants';
import { STATUS, STATUS_COLORS, STATUS_TEXT } from '@/utils/constants';
import { formatNumberWithCommas } from '@/utils/helpers';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment';
type Props = NativeStackScreenProps<RootStackParams> & { status: STATUS };
const StatusText = ({ rentalStatus }: { rentalStatus: STATUS }) => (
	<Text
		style={{
			color: STATUS_COLORS[rentalStatus] as string,
			fontSize: 12,
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
}: {
	rentalStatus: STATUS;
	id: string;
	ratingStatus: RATING_STATUS;
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
				const res = await confirmRental({ id: id.toString() }).unwrap();
				setModalVisible(true);
				setUrlPayment(res.data);
			} else {
				Alert.alert('Confirm', 'Do you want break?', [
					{
						text: 'Cancel',
						style: 'cancel',
					},
					{
						text: 'OK',
						onPress: async () => {
							await requestBreakRental({ id });
							ToastAndroid.showWithGravity(
								'Successfull',
								ToastAndroid.LONG,
								ToastAndroid.TOP,
							);
						},
					},
				]);
			}
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
					gap: 20,
				}}
			>
				<Spinner visible={isLoading || isConfirmLoading} />
				{rentalStatus === STATUS.COMPLETED &&
					ratingStatus === RATING_STATUS.NONE && (
						<Text
							style={{
								color: 'black',
								fontSize: 12,
								paddingTop: 8,
							}}
						>
							Reviewed
						</Text>
					)}
				<TouchableOpacity
					onPress={handleRequest}
					style={[
						{
							backgroundColor: '#E36414',
							height: 30,
							marginRight: 12,
							borderRadius: 8,
							justifyContent: 'center',
							alignItems: 'center',
						},
						{
							paddingHorizontal: 10,
						},
					]}
				>
					<Text
						style={{
							color: '#fff',
							fontSize: 12,
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
		<Text style={{ color: '#5E5D5E', fontSize: 12, marginRight: 12 }}>
			{STATUS_TEXT[rentalStatus]}
		</Text>
	);
};

const MyRentals = ({ navigation, status }: Props) => {
	const { data, isLoading, isFetching } = useGetMyRentalQuery(status);

	const accessToken = useAppSelector((state) => state.auth.accessToken);
	if (!accessToken) {
		return AuthRequirement({ navigation });
	}
	if (isLoading || isFetching) {
		return (
			<View style={{ flex: 1, padding: 24 }}>
				{new Array(5).fill(0).map((_, index) => {
					return (
						<View
							key={index}
							style={{
								width: '100%',
								height: 180,
								marginBottom: 24,
								borderWidth: StyleSheet.hairlineWidth,
								borderColor: '#c2c2c2',
								elevation: 2,
								backgroundColor: '#fff',
								borderRadius: 16,
								shadowColor: '#000',
								flexDirection: 'row',

								shadowOpacity: 0.12,
								shadowRadius: 12,
								justifyContent: 'flex-start',
								alignItems: 'center',
								shadowOffset: {
									width: 1,
									height: 1,
								},
							}}
						>
							<Skeleton
								// key={room.id}
								height={180}
								width={'35%'}
							/>
							<View style={{ flex: 1, gap: 8, padding: 16 }}>
								<Skeleton
									variant="box"
									height={10}
									width={'100%'}
								/>
								<Skeleton
									variant="box"
									height={20}
									width={'100%'}
								/>
								<Skeleton
									variant="box"
									height={20}
									width={'100%'}
								/>
								<Skeleton
									variant="box"
									height={20}
									width={'100%'}
								/>
							</View>
							{/* <Skeleton variant="box" height={20} width={'80%'} />
							<Skeleton
								variant="box"
								height={10}
								width={'100%'}
							/> */}
						</View>
					);
				})}
			</View>
		);
	}

	if (!data?.data.length) {
		return (
			<View
				style={{
					marginBottom: 0,
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					gap: 10,
					backgroundColor: 'white',
				}}
			>
				<Icon name="dropbox" size={100} />
				<Text style={{ color: '#000', fontSize: 18 }}>No room</Text>
			</View>
		);
	}
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 24 }}
				scrollEventThrottle={16}
			>
				<View
					style={{
						width: '100%',
						padding: 24,
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
					}}
				>
					{data?.data.map((myRental) => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								navigation.navigate('Rental', { myRental });
							}}
							key={myRental.rentalInfo.id}
							style={{
								width: '100%',
								height: 180,
								marginBottom: 24,
								borderWidth: StyleSheet.hairlineWidth,
								borderColor: '#c2c2c2',
								elevation: 2,
								backgroundColor: '#fff',
								borderRadius: 16,
								shadowColor: '#000',
								flexDirection: 'row',

								shadowOpacity: 0.12,
								shadowRadius: 12,
								justifyContent: 'flex-start',
								alignItems: 'center',
								shadowOffset: {
									width: 1,
									height: 1,
								},
							}}
						>
							<Image
								source={{
									uri:
										myRental.roomInfo.images &&
										(myRental.roomInfo.images[0] as string),
								}}
								style={{
									width: '35%',
									height: '100%',
									borderTopLeftRadius: 12,
									borderBottomLeftRadius: 12,
								}}
								resizeMode="cover"
							/>
							<View
								style={{
									flex: 1,
								}}
							>
								<View
									style={{
										paddingHorizontal: 12,
										// flexDirection: 'row',
										// justifyContent: 'space-between',
									}}
								>
									<StatusText
										rentalStatus={myRental.status}
									/>
									<Text
										style={{
											color: '#000',
											fontSize: 13,
											fontWeight: '900',
										}}
									>
										{myRental.roomInfo.roomName}
									</Text>
								</View>
								<View
									style={{
										flexDirection: 'row',
										borderBottomColor: '#5E5D5E',
										borderBottomWidth: 0.5,
										paddingHorizontal: 12,
										paddingBottom: 18,
									}}
								>
									<View style={{ flex: 1 }}>
										<Text style={styles.textTitle}>
											Movie in date
										</Text>
										<Text style={styles.textInfo}>
											{moment(
												myRental.rentalInfo.moveInDate,
											).format('ll')}
										</Text>
										<Text style={styles.textTitle}>
											Monthly rent
										</Text>
										<Text style={styles.textInfo}>
											{formatNumberWithCommas(
												myRental.roomInfo.price,
											)}{' '}
											VND
										</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.textTitle}>
											Lease term
										</Text>
										<Text style={styles.textInfo}>
											{myRental.rentalInfo.leaseTerm}
										</Text>
										<Text style={styles.textTitle}>
											Deposit amount
										</Text>
										<Text style={styles.textInfo}>
											{formatNumberWithCommas(
												myRental.roomInfo.depositAmount,
											)}{' '}
											VND
										</Text>
									</View>
								</View>
								<View
									style={{
										marginTop: 8,
										justifyContent: 'center',
										width: '100%',
										alignItems: 'flex-end',
									}}
								>
									<ActionButton
										ratingStatus={
											myRental.rentalInfo.ratingStatus
										}
										rentalStatus={myRental.status}
										id={myRental.rentalInfo.id || ''}
									/>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default MyRentals;

const styles = StyleSheet.create({
	textTitle: {
		color: '#5E5D5E',
		fontSize: 11,
		fontWeight: '500',
	},
	textInfo: {
		color: '#000',
		fontSize: 11,
		fontWeight: '500',
	},
});
