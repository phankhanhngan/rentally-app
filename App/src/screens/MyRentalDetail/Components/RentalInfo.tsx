import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { IRentalInfo } from '@/interfaces/rental.interface';
import { formatNumberWithCommas } from '@/utils/helpers';
import moment from 'moment';
const RentalInfo = ({
	rentalInfo,
	price,
	depositAmount,
}: {
	rentalInfo: IRentalInfo & {
		moveOutDate?: string;
		electricPrice?: number;
		waterPrice?: number;
		rentalDetailId: string;
		leaseTerminationCost?: number;
		additionalPrice?: number;
		id?: string;
		photo?: string;
	};
	price: number;
	depositAmount: number;
}) => {
	return (
		<View
			style={{
				paddingHorizontal: 12,
				paddingBottom: 16,
				gap: 12,
			}}
		>
			<Text style={{ fontWeight: '800', fontSize: 20, color: '#000' }}>
				Personal information
			</Text>

			<View
				style={{
					flex: 1,
					flexDirection: 'row',
				}}
			>
				<View style={{ flex: 1, gap: 8 }}>
					<View>
						<Text style={styles.textTitle}>Movie in date:</Text>
						<Text style={styles.textInfo}>
							{moment(rentalInfo.moveInDate).format('ll')}
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Monthly rent:</Text>
						<Text style={styles.textInfo}>
							{formatNumberWithCommas(price)} VND
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Number of tenants:</Text>
						<Text style={styles.textInfo}>
							{rentalInfo.numberOfTenants}
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Electric price:</Text>
						<Text style={styles.textInfo}>
							{formatNumberWithCommas(rentalInfo.electricPrice)}{' '}
							VND / letter
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Additional price:</Text>
						<Text style={styles.textInfo}>
							{formatNumberWithCommas(rentalInfo.additionalPrice)}{' '}
							VND
						</Text>
					</View>
				</View>
				<View style={{ flex: 1, gap: 8 }}>
					<View>
						<Text style={styles.textTitle}>Lease term</Text>
						<Text style={styles.textInfo}>
							{rentalInfo.leaseTerm}
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Deposit amount</Text>
						<Text style={styles.textInfo}>
							{formatNumberWithCommas(depositAmount)} VND
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>
							Lease termination cost:
						</Text>
						<Text style={styles.textInfo}>
							{formatNumberWithCommas(
								rentalInfo.leaseTerminationCost,
							)}{' '}
							VND
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Water price:</Text>
						<Text style={styles.textInfo}>
							{formatNumberWithCommas(rentalInfo.waterPrice)} VND
							/ cube
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default RentalInfo;
const styles = StyleSheet.create({
	textTitle: {
		color: '#5E5D5E',
		fontSize: 14,
		fontWeight: '500',
	},
	textInfo: {
		color: '#000',
		fontSize: 15,
		fontWeight: '500',
	},
});
