import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import type { IRatingDetail } from '@/interfaces/room-detail.interface';

const OverView = ({ ratingDetail }: { ratingDetail: IRatingDetail }) => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					paddingTop: 90,
					justifyContent: 'flex-start',
					alignItems: 'center',
					flexDirection: 'row',
					paddingBottom: 24,
					paddingHorizontal: 24,
					gap: 12,
					// backgroundColor: '#F8F8F8',
				}}
			>
				<Icon4 name="star" size={30} color="#000" />
				<Text
					style={{
						fontSize: 32,
						fontWeight: '700',
						color: '#000',
					}}
				>
					{ratingDetail.avgRate}
				</Text>
			</View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 24 }}
				scrollEventThrottle={16}
				style={{
					padding: 12,
					paddingBottom: 32,
					borderColor: '#ccc',
					borderBottomWidth: 0.5,
					// backgroundColor: '#F8F8F8',
				}}
			>
				<View
					style={{
						borderRightWidth: 0.5,
						borderColor: '#ccc',
						paddingHorizontal: 16,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						Clean rate
					</Text>

					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
							marginBottom: 24,
						}}
					>
						{ratingDetail.avgClean}
					</Text>
					<Icon name="spray-can" size={32} color={'#000'} />
				</View>
				<View
					style={{
						borderRightWidth: 0.5,
						borderColor: '#ccc',
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						Location rate
					</Text>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
							marginBottom: 24,
						}}
					>
						{ratingDetail.avgLocation}
					</Text>
					<Icon3 name="location" size={32} color={'#000'} />
				</View>
				<View
					style={{
						borderRightWidth: 0.5,
						borderColor: '#ccc',
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						Security rate
					</Text>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
							marginBottom: 24,
						}}
					>
						{ratingDetail.avgSecurity}
					</Text>
					<Icon2 name="security" size={32} color={'#000'} />
				</View>
				<View
					style={{
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
						}}
					>
						Support rate
					</Text>
					<Text
						style={{
							color: '#000',
							fontWeight: '700',
							fontSize: 12,
							marginBottom: 24,
						}}
					>
						{ratingDetail.avgSupport}
					</Text>
					<Icon2 name="support-agent" size={32} color={'#000'} />
				</View>
			</ScrollView>
		</View>
	);
};

export default OverView;
