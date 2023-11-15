import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Comments = () => {
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
					uri: 'https://a0.muscache.com/im/pictures/miso/Hosting-721540609203378406/original/9dfaf7d6-40f2-4673-b468-7c5ab3147f86.jpeg?im_w=720',
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
					<Text style={{ color: '#5E5D5E' }}>
						144 Nguyễn Lương Bằng
					</Text>
					<Text style={{ color: '#000', fontSize: 16 }}>
						Liên Chiểu, Đà Nẵng
					</Text>
				</View>
				<View>
					<View
						style={{
							justifyContent: 'flex-start',
							flexDirection: 'row',
							alignItems: 'center',
							gap: 4,
						}}
					>
						<Icon name="star" size={18} color="#000" />
						<Text
							style={{
								color: '#000',
								fontSize: 16,
								fontFamily: 'mon-sb',
							}}
						>
							4.8
						</Text>
						<Text
							style={{
								color: '#5E5D5E',
								fontSize: 14,
								fontFamily: 'mon-sb',
							}}
						>
							(60)
						</Text>
					</View>
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
							€ 1000
						</Text>
						<Text>month</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Comments;
