import React, { useState } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;
const CheckList = ({ navigation }: Props) => {
	const [isEdit, setIsEdit] = useState(false);
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Pressable
				onPress={() => {
					setIsEdit((prev) => !prev);
				}}
			>
				<Text
					style={{
						fontWeight: '500',
						fontSize: 16,
						color: '#000',
						paddingBottom: 10,
						marginTop: 20,
						marginRight: 20,
						textDecorationLine: 'underline',
						alignSelf: 'flex-end',
					}}
				>
					{!isEdit ? 'Edit' : 'Done'}
				</Text>
			</Pressable>
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
						marginTop: 2,
						marginLeft: 20,
					}}
				>
					Check List
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
					{Array.from({ length: 10 }).map((_, index) => (
						<View
							key={index}
							style={{
								width: '48%',
								height: 246,
								marginBottom: 24,
							}}
						>
							<TouchableOpacity
								activeOpacity={0.7}
								style={{
									borderWidth: StyleSheet.hairlineWidth,
									borderColor: '#c2c2c2',
									elevation: 2,
									padding: 6,
									borderRadius: 12,
									shadowColor: '#000',
									shadowOpacity: 0.12,
									shadowRadius: 12,
									justifyContent: 'center',
									alignItems: 'center',
									shadowOffset: {
										width: 1,
										height: 1,
									},
								}}
								onPress={() => {
									navigation.navigate('Room', { name: '' });
								}}
							>
								{isEdit && (
									<View
										style={{
											position: 'absolute',
											top: 10,
											left: 10,
											zIndex: 2,
										}}
									>
										<TouchableOpacity
											style={{
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											<View
												style={{
													backgroundColor: '#fff',
													borderWidth: 0.5,
													borderColor: '#ccc',
													width: 28,
													height: 28,
													justifyContent: 'center',
													alignItems: 'center',
													borderRadius: 20,
												}}
											>
												<Icon
													name="x"
													color="#000"
													size={14}
												/>
											</View>
										</TouchableOpacity>
									</View>
								)}
								<Image
									source={{
										uri: 'https://a0.muscache.com/im/pictures/miso/Hosting-721540609203378406/original/9dfaf7d6-40f2-4673-b468-7c5ab3147f86.jpeg?im_w=720',
									}}
									style={{
										width: '100%',
										aspectRatio: 1,
										borderRadius: 6,
									}}
									resizeMode="cover"
								/>
							</TouchableOpacity>

							<Text
								style={{
									paddingTop: 8,
									color: '#000',
									fontSize: 18,
									fontWeight: '500',
								}}
							>
								117 Tân Trào
							</Text>
							<Text
								style={{
									color: '#5E5D5E',
									fontSize: 14,
									fontWeight: '500',
								}}
							>
								Hương Thủy, Huế
							</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default CheckList;
