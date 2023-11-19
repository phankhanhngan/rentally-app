import React, { useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;
import Loading from '@/components/Loading';
import { useGetMyRentalQuery } from '@/redux/services/myRental/myRental.service';
import { STATUS, STATUS_COLORS, STATUS_TEXT } from '@/utils/constants';

const StatusText = ({ rentalStatus }: { rentalStatus: STATUS }) => (
	<Text
		style={{
			color: STATUS_COLORS[rentalStatus] as string,
			fontSize: 12,
			fontWeight: '700',
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
		);
	return (
		<Text style={{ color: '#5E5D5E', fontSize: 12, marginRight: 12 }}>
			{STATUS_TEXT[rentalStatus]}
		</Text>
	);
};

const CheckList = ({ navigation }: Props) => {
	const { data, isLoading, isFetching } = useGetMyRentalQuery('');

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
				<Text
					style={{
						fontWeight: '500',
						fontSize: 26,
						color: '#000',
						marginTop: 12,
						marginLeft: 20,
					}}
				>
					My Rentals
				</Text>
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
								navigation.navigate('Rental', { name: '' });
							}}
							key={myRental.rentalInfo.id}
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
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<Text
										style={{
											color: '#000',
											fontSize: 16,
											fontWeight: '700',
										}}
									>
										Room F103
									</Text>
									<StatusText
										rentalStatus={myRental.status}
									/>
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
											28/11/2023
										</Text>
										<Text style={styles.textTitle}>
											Monthly rent
										</Text>
										<Text style={styles.textInfo}>
											{myRental.roomInfo.price} VND
										</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={styles.textTitle}>
											Lease term
										</Text>
										<Text style={styles.textInfo}>
											28/11/2023
										</Text>
										<Text style={styles.textTitle}>
											Deposit amount
										</Text>
										<Text style={styles.textInfo}>
											{myRental.roomInfo.depositAmount}{' '}
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
										rentalStatus={myRental.status}
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

export default CheckList;

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
