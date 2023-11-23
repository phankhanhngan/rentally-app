import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Filter from './Components/Filter';
import Search from './Components/Search';
import ExploreHeader from '@/components/ExploreHeader';
import Listing from '@/components/Listing';
import Loading from '@/components/Loading';
import { Skeleton } from '@/components/Skeleton';
import type { IRoomFinding } from '@/interfaces/roomfiding.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { useAppSelector } from '@/redux/hook';
import { useGetFindingRoomsQuery } from '@/redux/services/findingRoom/findingRoom.service';
import {
	useGetProvincesQuery,
	useGetUtilitiesQuery,
} from '@/redux/services/help/help.service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type Props = NativeStackScreenProps<RootStackParams>;
const Home = ({ navigation }: Props) => {
	// const [searchParamsObject, setSearchParamsObject] = useState<
	// 	Record<string, string[]>
	// >({ page: ['1'] });
	const { isLoading: isGetUltilitiesLoading } = useGetUtilitiesQuery('');
	const { isLoading: isGetProvincesLoading } = useGetProvincesQuery('');

	const searchParamsObject = useAppSelector(
		(state) => state.params.searchParamsObject,
	);
	const [isOpenSearch, setOpenSearch] = useState(false);
	const [isOpenFilter, setOpenFilter] = useState(false);
	const { data, isLoading, isFetching } =
		useGetFindingRoomsQuery(searchParamsObject);
	const toggleSheetSearch = () => {
		setOpenSearch((prev) => !prev);
	};
	const toggleSheetFilter = () => {
		setOpenFilter((prev) => !prev);
	};

	if (
		isLoading ||
		isFetching ||
		isGetUltilitiesLoading ||
		isGetProvincesLoading
	) {
		return (
			<View style={{ flex: 1 }}>
				<ExploreHeader
					onSearchPress={toggleSheetSearch}
					onFilterPress={toggleSheetFilter}
				/>
				<View style={{ marginTop: 30, marginHorizontal: 24, gap: 8 }}>
					<Skeleton variant="box" height={300} width={'100%'} />
					<Skeleton variant="box" height={30} width={'100%'} />
					<Skeleton variant="box" height={30} width={80} />
				</View>
				<View style={{ marginTop: 30, marginHorizontal: 24, gap: 8 }}>
					<Skeleton variant="box" height={300} width={'100%'} />
					<Skeleton variant="box" height={30} width={'100%'} />
					<Skeleton variant="box" height={30} width={80} />
				</View>
				{/* <Loading /> */}
			</View>
		);
	}

	if (data?.data?.rooms?.length === 0) {
		return (
			<GestureHandlerRootView style={styles.screenContainer}>
				<ExploreHeader
					onSearchPress={toggleSheetSearch}
					onFilterPress={toggleSheetFilter}
				/>
				<Text>Hoong co gi ma oi</Text>
				{isOpenSearch && (
					<>
						<AnimatedPressable
							entering={FadeIn}
							exiting={FadeOut}
							style={{
								...StyleSheet.absoluteFillObject,
								backgroundColor: 'rgba(0, 0, 0, 0.3)',
								zIndex: 1,
							}}
							onPress={toggleSheetSearch}
						></AnimatedPressable>
						<Search onSearchPress={toggleSheetSearch} />
					</>
				)}
				{isOpenFilter && (
					<>
						<AnimatedPressable
							entering={FadeIn}
							exiting={FadeOut}
							style={{
								...StyleSheet.absoluteFillObject,
								backgroundColor: 'rgba(0, 0, 0, 0.3)',
								zIndex: 1,
							}}
							onPress={toggleSheetFilter}
						></AnimatedPressable>
						<Filter onFilterPress={toggleSheetFilter} />
					</>
				)}
			</GestureHandlerRootView>
		);
	}
	return (
		<GestureHandlerRootView style={styles.screenContainer}>
			<ExploreHeader
				onSearchPress={toggleSheetSearch}
				onFilterPress={toggleSheetFilter}
			/>
			<ScrollView>
				<View
					style={{
						flex: 1,
						backgroundColor: '#FDFFFF',
					}}
				>
					{data?.data?.rooms.map((dataRoom: IRoomFinding) => (
						<Listing
							key={dataRoom.id}
							data={dataRoom}
							name={dataRoom.id}
							onPress={(id) => {
								navigation.navigate('Room', {
									id,
								});
							}}
						/>
					))}
				</View>
			</ScrollView>
			{isOpenSearch && (
				<>
					<AnimatedPressable
						entering={FadeIn}
						exiting={FadeOut}
						style={{
							...StyleSheet.absoluteFillObject,
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
							zIndex: 1,
						}}
						onPress={toggleSheetSearch}
					></AnimatedPressable>
					<Search onSearchPress={toggleSheetSearch} />
				</>
			)}
			{isOpenFilter && (
				<>
					<AnimatedPressable
						entering={FadeIn}
						exiting={FadeOut}
						style={{
							...StyleSheet.absoluteFillObject,
							backgroundColor: 'rgba(0, 0, 0, 0.3)',
							zIndex: 1,
						}}
						onPress={toggleSheetFilter}
					></AnimatedPressable>
					<Filter onFilterPress={toggleSheetFilter} />
				</>
			)}
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
	},
	mapStyle: {
		width: 400,
		height: 100,
	},
});

export default Home;
