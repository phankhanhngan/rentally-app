import React, { useState } from 'react';
import {
	Alert,
	Button,
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams> & {
	status: PAYMENTSTATUS;
};
import Spinner from 'react-native-loading-spinner-overlay';
import WebView from 'react-native-webview';

import BackButton from '@/components/BackButton';
import ButtonWithLoader from '@/components/ButtonWithLoader';
import Loading from '@/components/Loading';
import {
	useCheckOutMutation,
	useGetMyPaymentQuery,
} from '@/redux/services/payment/payment.service';
import { PAYMENTSTATUS } from '@/utils/constants';
import { PAYMENTSTATUS_COLORS, PAYMENTSTATUS_TEXT } from '@/utils/constants';
import { formatNumberWithCommas } from '@/utils/helpers';
import moment from 'moment';

const ActionButton = ({
	rentalStatus,
	id,
}: {
	rentalStatus: PAYMENTSTATUS;
	id: string;
}) => {
	const [checkOut, { isLoading }] = useCheckOutMutation();
	const { refetch } = useGetMyPaymentQuery(PAYMENTSTATUS.PAID);
	const { refetch: refetch2 } = useGetMyPaymentQuery(PAYMENTSTATUS.UNPAID);

	const [modalVisible, setModalVisible] = useState(false);
	const [urlPayment, setUrlPayment] = useState('');
	const handleRequest = async () => {
		try {
			const res = await checkOut({ id }).unwrap();
			setModalVisible(true);

			setUrlPayment(res.data);
		} catch (error: any) {
			console.log(error);
			Alert.alert('error!', error.data.message);
		}
	};

	if (rentalStatus === PAYMENTSTATUS.UNPAID)
		return (
			<>
				<Spinner visible={isLoading} />
				<TouchableOpacity
					onPress={handleRequest}
					style={[
						{
							backgroundColor: PAYMENTSTATUS_COLORS[
								rentalStatus
							] as string,
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
						{PAYMENTSTATUS_TEXT[rentalStatus]}
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
			</>
		);
	return (
		<Text style={{ color: '#5E5D5E', fontSize: 12, marginRight: 12 }}>
			{PAYMENTSTATUS_TEXT[rentalStatus]}
		</Text>
	);
};

const PaymentList = ({ navigation, status }: Props) => {
	const { data, isLoading, isFetching } = useGetMyPaymentQuery(status);
	if (isLoading || isFetching) {
		return (
			<View style={{ flex: 1 }}>
				<Loading />
			</View>
		);
	}
	if (data?.data.length) {
		<View style={{ flex: 1 }}>
			<Text>Hoong co gi ma oi</Text>
		</View>;
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
					{data?.data.map((myPayment) => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								navigation.navigate('Rental', {
									myRental: myPayment.rental,
								});
							}}
							key={myPayment.id}
							style={{
								width: '100%',
								height: 160,
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
										myPayment.rental.roomInfo.images &&
										(myPayment.rental.roomInfo
											.images[0] as string),
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
									<Text
										style={{
											color: '#000',
											fontSize: 13,
											fontWeight: '900',
										}}
									>
										{myPayment.rental.roomInfo.roomName}
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
											Electric
										</Text>
										<Text style={styles.textInfo}>
											{formatNumberWithCommas(
												myPayment.totalElectricPrice,
											)}{' '}
											VND
										</Text>
										<Text style={styles.textTitle}>
											Water
										</Text>
										<Text style={styles.textInfo}>
											{formatNumberWithCommas(
												myPayment.totalWaterPrice,
											)}{' '}
											VND
										</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.textTitle}>
											Addition
										</Text>
										<Text style={styles.textInfo}>
											{formatNumberWithCommas(
												myPayment.additionalPrice,
											)}{' '}
											VND
										</Text>
										<Text style={styles.textTitle}>
											Total
										</Text>
										<Text
											style={{
												color: '#ce0c0c',
												fontSize: 13,
												fontWeight: '700',
											}}
										>
											{formatNumberWithCommas(
												myPayment.totalPrice,
											)}{' '}
											VND
										</Text>
									</View>
								</View>
								<View
									style={{
										marginTop: 4,
										justifyContent: 'space-between',
										width: '100%',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<Text
										style={{
											color: 'black',
											fontSize: 12,
											fontFamily: 'mon-b',
											paddingLeft: 12,
										}}
									>
										{moment(
											myPayment.expirationDate,
										).format('ll')}
									</Text>
									<ActionButton
										rentalStatus={myPayment.status}
										id={myPayment.id || ''}
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

export default PaymentList;

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
