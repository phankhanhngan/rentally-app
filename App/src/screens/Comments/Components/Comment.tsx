import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Comment = () => {
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
						uri: 'https://a0.muscache.com/im/pictures/miso/Hosting-721540609203378406/original/9dfaf7d6-40f2-4673-b468-7c5ab3147f86.jpeg?im_w=720',
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
						HoangDeptrai
					</Text>
					<Text style={{ color: '#5E5D5E' }}>
						hoangdepreai@gmail.com{' '}
					</Text>
				</View>
			</View>
			<View
				style={{
					marginVertical: 8,
					flexDirection: 'row',
					gap: 6,
					justifyContent: 'flex-start',
					alignContent: 'center',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						gap: 2,
						alignItems: 'center',
					}}
				>
					<Icon name="star" size={12} color="#000" />
					<Icon name="star" size={12} color="#000" />
					<Icon name="star" size={12} color="#000" />
					<Icon name="star" size={12} color="#000" />
					<Icon name="star" size={12} color="#ccc" />
				</View>
				<Text
					style={{
						fontWeight: '600',
						fontSize: 14,
						color: '#000',
					}}
				>
					· 10/02/2022
				</Text>
			</View>
			<Text
				style={{
					fontWeight: '300',
					fontSize: 16,
					color: '#000',
				}}
			>
				90-91 pace would be perfect also shooting should be 85-87 it
				would be a beast in ultimate team 90-91 pace would be perfect
				also shooting should be 85-87 it would be a beast in ultimate
				team.
			</Text>
		</View>
	);
};

export default Comment;
