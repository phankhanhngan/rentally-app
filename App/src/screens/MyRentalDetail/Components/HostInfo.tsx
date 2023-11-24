import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { IUser } from '@/interfaces/user.interface';

const HostInfo = ({ hostInfo }: { hostInfo: IUser }) => {
	return (
		<View
			style={{
				paddingHorizontal: 12,
				paddingBottom: 16,
				gap: 12,
			}}
		>
			<Text style={{ fontWeight: '800', fontSize: 20, color: '#000' }}>
				Host information
			</Text>
			<Image
				source={{
					uri: hostInfo.photo,
				}}
				style={styles.host}
			/>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
				}}
			>
				<View style={{ flex: 1, gap: 8 }}>
					<View>
						<Text style={styles.textTitle}>First name:</Text>
						<Text style={styles.textInfo}>
							{hostInfo.firstName || ''}{' '}
						</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>last name:</Text>
						<Text style={styles.textInfo}>{hostInfo.lastName}</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Phone:</Text>
						<Text style={styles.textInfo}>
							{hostInfo.phoneNumber || 'empty'}
						</Text>
					</View>
				</View>
				<View style={{ flex: 1, gap: 8 }}>
					<View>
						<Text style={styles.textTitle}>Identity number:</Text>
						<Text style={styles.textInfo}>123123xxx</Text>
					</View>
					<View>
						<Text style={styles.textTitle}>Email:</Text>
						<Text style={styles.textInfo}>{hostInfo.email}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default HostInfo;

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
	host: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: '#5E5D5E',
		paddingHorizontal: 12,
	},
});
