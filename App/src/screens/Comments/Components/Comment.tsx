import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import type { IRating } from '@/interfaces/room-detail.interface';
import moment from 'moment';

const Comment = ({ rating }: { rating: IRating }) => {
	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 12,
				}}
			>
				<Image
					source={{
						uri:
							rating.renterPhoto &&
							(rating.renterPhoto as string),
					}}
					style={{
						width: 50,
						height: 50,
						borderRadius: 50,
						backgroundColor: '#5E5D5E',
						paddingHorizontal: 12,
					}}
				/>

				<View>
					<Text
						style={{
							fontWeight: '500',
							fontSize: 16,
							color: '#000',
						}}
					>
						{rating.renterName}
					</Text>
				</View>
			</View>
			<View
				style={{
					marginVertical: 8,
					flexDirection: 'row',
					gap: 6,
					justifyContent: 'flex-start',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						gap: 2,
						position: 'absolute',
						left: 0,
						zIndex: 1,
						bottom: 0,
						top: 0,
						alignItems: 'center',

						// backgroundColor: '#ccc',
					}}
				>
					{Array.from({
						length: Math.floor(rating.avgRate),
					}).map((_, index) => (
						<Icon key={index} name="star" size={12} color="#000" />
					))}

					{(rating.avgRate || 0) - Math.floor(rating.avgRate || 0) >
						0 && (
						<Icon
							name="star"
							size={12}
							style={{ width: 9 }}
							color="#000"
						/>
					)}
				</View>
				<View
					style={{
						flexDirection: 'row',
						gap: 2,
						alignItems: 'center',
					}}
				>
					<Icon name="star" size={12} color="#ccc" />
					<Icon name="star" size={12} color="#ccc" />
					<Icon name="star" size={12} color="#ccc" />
					<Icon name="star" size={12} color="#ccc" />
					<Icon name="star" size={12} color="#ccc" />
				</View>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 14,
						color: '#000',
					}}
				>
					·{moment(rating.createdAt).format('ll')}
				</Text>
			</View>
			<Text
				style={{
					fontWeight: '300',
					fontSize: 16,
					color: '#000',
				}}
			>
				{rating.comment}
			</Text>
		</View>
	);
};

export default Comment;
