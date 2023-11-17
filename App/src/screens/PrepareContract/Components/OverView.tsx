import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { formatNumberWithCommas } from '@/utils/helpers';

export interface IOverView {
	price: string;
	image: string;
	totalRating: number;
	numberOfReviews: number;
	district: string;
	province: string;
	address: string;
}
interface OverViewProps {
	overView: IOverView;
}

const OverView = ({ overView }: OverViewProps) => {
	const {
		price,
		image,
		totalRating,
		numberOfReviews,
		address,
		district,
		province,
	} = overView;
	return (
		<View
			style={{
				flexDirection: 'row',
				padding: 24,
				gap: 12,
				height: 160,
			}}
		>
			<Image
				source={{
					uri: image,
				}}
				style={{
					flex: 3,

					borderRadius: 10,
				}}
				resizeMode="cover"
			/>
			<View
				style={{
					flex: 3,
					padding: 8,
					justifyContent: 'space-between',
				}}
			>
				<View>
					<Text style={{ color: '#5E5D5E' }}>{address}</Text>
					<Text style={{ color: '#000', fontSize: 14 }}>
						{district}, {province}
					</Text>
				</View>
				<View>
					{numberOfReviews ? (
						<View
							style={{
								justifyContent: 'flex-start',
								flexDirection: 'row',
								alignItems: 'center',
								gap: 4,
							}}
						>
							<Icon name="star" size={16} color="#000" />
							<Text
								style={{
									color: '#000',
									fontSize: 14,
									fontFamily: 'mon-sb',
								}}
							>
								{totalRating}
							</Text>
							<Text
								style={{
									color: '#5E5D5E',
									fontSize: 12,
									fontFamily: 'mon-sb',
								}}
							>
								({numberOfReviews})
							</Text>
						</View>
					) : (
						<Text>No reviews yet</Text>
					)}
					<View
						style={{
							justifyContent: 'flex-start',
							flexDirection: 'row',
							alignItems: 'center',
							gap: 4,
						}}
					>
						<Text
							style={{
								color: '#000',
								fontSize: 16,
								fontFamily: 'mon-sb',
							}}
						>
							VND {formatNumberWithCommas(price || '')}
						</Text>
						<Text>month</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default OverView;
