import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';

import type { IUtiltity } from '@/interfaces/utility.interface';

interface ListingProps {
	utility: IUtiltity;
}

const Ultility = ({ utility }: ListingProps) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				gap: 24,
				paddingHorizontal: 20,
			}}
		>
			<Image
				style={{
					width: 30,
					height: 30,
					borderRadius: 50,
					backgroundColor: '#fff',
					paddingHorizontal: 12,
				}}
				source={{
					uri: utility.icon,
				}}
			/>

			<View>
				<Text
					style={{ fontWeight: '500', fontSize: 16, color: '#000' }}
				>
					{utility.name}
				</Text>
				<Text style={{ color: '#5E5D5E' }}>{utility.note} </Text>
			</View>
		</View>
	);
};

export default Ultility;
