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
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import { AuthRequirement } from '@/components/AuthRequirement';
import Loading from '@/components/Loading';
import { Skeleton } from '@/components/Skeleton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { useAppSelector } from '@/redux/hook';
import {
	useCreateChecklistMutation,
	useGetCheckListQuery,
} from '@/redux/services/checkList/checkList.service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;
const CheckList = ({ navigation }: Props) => {
	const [isEdit, setIsEdit] = useState(false);

	const { data, isLoading, isFetching } = useGetCheckListQuery('');
	const [createChecklist, { isLoading: isCreateCheckListLoading }] =
		useCreateChecklistMutation();

	const handleClickHeartButton = async (id: string) => {
		await createChecklist({
			roomId: id,
		});
	};
	const accessToken = useAppSelector((state) => state.auth.accessToken);
	if (!accessToken) {
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
				<Text
					style={{
						// paddingTop: 24,
						fontWeight: '500',
						fontSize: 26,
						color: '#000',
						marginTop: 2,
						marginLeft: 20,
					}}
				>
					Check List
				</Text>
				{AuthRequirement({ navigation })}
			</View>
		);
	}

	if (isLoading || isFetching) {
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
				<Text
					style={{
						// paddingTop: 24,
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
					{new Array(5).fill(0).map((_, index) => {
						return (
							<View
								key={index}
								style={{
									width: '48%',
									height: 220,
									marginBottom: 24,
									gap: 4,
								}}
							>
								<Skeleton
									// key={room.id}
									height={160}
									width={'100%'}
								/>
								<Skeleton
									variant="box"
									height={20}
									width={'80%'}
								/>
								<Skeleton
									variant="box"
									height={10}
									width={'100%'}
								/>
							</View>
						);
					})}
				</View>
			</View>
		);
	}
	if (!data?.data?.length) {
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
				<Text
					style={{
						// paddingTop: 24,
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
						marginBottom: 0,
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						gap: 10,
						backgroundColor: 'white',
					}}
				>
					<Icon2 name="dropbox" size={100} />
					<Text style={{ color: '#000', fontSize: 18 }}>No room</Text>
				</View>
			</View>
		);
	}
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Spinner visible={isCreateCheckListLoading} />
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
					{data?.data?.map((room) => (
						<View
							key={room.id}
							style={{
								width: '48%',
								height: 220,
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
									backgroundColor: '#fff',
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
									navigation.navigate('Room', {
										id: room.id,
									});
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
											onPress={() =>
												handleClickHeartButton(room.id)
											}
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
										uri: room.images[0],
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
									fontSize: 16,
									fontWeight: '500',
								}}
							>
								{room.address}
							</Text>
							<Text
								style={{
									color: '#5E5D5E',
									fontSize: 12,
									fontWeight: '500',
								}}
							>
								{room.district}, {room.city}
							</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default CheckList;
