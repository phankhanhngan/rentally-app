import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

import Filter from './Components/Filter';
import Search from './Components/Search';
import ExploreHeader from '@/components/ExploreHeader';
import Listing from '@/components/Listing';
import { Skeleton } from '@/components/Skeleton';
import type { IRoomFinding } from '@/interfaces/roomfinding.interface';
import type { RootStackParams } from '@/navigations/StackNavigator';
import { addParam } from '@/redux/features/params/params.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useGetFindingRoomsQuery } from '@/redux/services/findingRoom/findingRoom.service';
import {
	useGetPriceQuery,
	useGetProvincesQuery,
	useGetUtilitiesQuery,
} from '@/redux/services/help/help.service';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type Props = NativeStackScreenProps<RootStackParams>;
const Home = ({ navigation }: Props) => {
	const { isLoading: isGetUltilitiesLoading } = useGetUtilitiesQuery('');
	const { isLoading: isGetProvincesLoading } = useGetProvincesQuery('');
	const { isLoading: isGetPriceLoading } = useGetPriceQuery('');

	const searchParamsObject = useAppSelector(
		(state) => state.params.searchParamsObject,
	);
	const dispatch = useAppDispatch();

	// const [currentPage, setCurrentPage] = useState(1);
	const [isOpenSearch, setOpenSearch] = useState(false);
	console.log(isOpenSearch);
	const [isOpenFilter, setOpenFilter] = useState(false);
	const { data, isLoading, isFetching } =
		useGetFindingRoomsQuery(searchParamsObject);

	let currentPage = 0,
		numberOfPage = 0;

	if (data?.data) {
		({ currentPage, numberOfPage } = data.data);
	}

	const [currentRooms, setCurrentRooms] = useState<IRoomFinding[]>(
		data?.data?.rooms || [],
	);

	useEffect(() => {
		const newRooms = data?.data?.rooms || [];

		if (searchParamsObject['page'] && searchParamsObject['page'][0] === 1) {
			setCurrentRooms([...newRooms]);
		} else {
			setCurrentRooms((prevRooms) => {
				return [...prevRooms, ...newRooms];
			});
		}
	}, [data]);

	const toggleSheetSearch = () => {
		setOpenSearch((prev) => !prev);
	};
	const toggleSheetFilter = () => {
		setOpenFilter((prev) => !prev);
	};
	const loadMoreItem = () => {
		if (currentPage === numberOfPage) return;
		dispatch(
			addParam({
				name: 'page',
				values: [currentPage + 1],
			}),
		);
	};
	const RenderLoader = () => {
		return isFetching ? (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={{ marginTop: 20, marginHorizontal: 24, gap: 8 }}>
					<Skeleton variant="box" height={300} width={'100%'} />
					<Skeleton variant="box" height={30} width={'100%'} />
					<Skeleton variant="box" height={30} width={80} />
				</View>
				<View style={{ marginTop: 20, marginHorizontal: 24, gap: 8 }}>
					<Skeleton variant="box" height={300} width={'100%'} />
					<Skeleton variant="box" height={30} width={'100%'} />
					<Skeleton variant="box" height={30} width={80} />
				</View>
			</View>
		) : null;
	};
	if (
		(isLoading ||
			isFetching ||
			isGetUltilitiesLoading ||
			isGetProvincesLoading ||
			isGetPriceLoading) &&
		searchParamsObject['page'] &&
		searchParamsObject['page'][0] === 1
	) {
		return (
			<GestureHandlerRootView style={styles.screenContainer}>
				<ExploreHeader
					onSearchPress={toggleSheetSearch}
					onFilterPress={toggleSheetFilter}
				/>
				<RenderLoader />
			</GestureHandlerRootView>
		);
	}

	if (data?.data?.rooms?.length === 0) {
		return (
			<GestureHandlerRootView style={styles.screenContainer}>
				<ExploreHeader
					onSearchPress={toggleSheetSearch}
					onFilterPress={toggleSheetFilter}
				/>
				<View
					style={{
						marginBottom: 80,
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						gap: 10,
					}}
				>
					<Icon name="dropbox" size={100} />
					<Text style={{ color: '#000', fontSize: 18 }}>
						No room matches with your search.
					</Text>
				</View>
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
			<View style={{ marginTop: -2 }}>
				<FlatList
					data={currentRooms}
					keyExtractor={(item: IRoomFinding) => item.id}
					renderItem={({
						item: dataRoom,
					}: {
						item: IRoomFinding;
					}) => (
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
					)}
					ListFooterComponent={RenderLoader}
					onEndReached={loadMoreItem}
					contentContainerStyle={{ paddingBottom: 100 }}
				/>
			</View>
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
		backgroundColor: 'white',
	},
	mapStyle: {
		width: 400,
		height: 100,
	},
});

export default Home;
