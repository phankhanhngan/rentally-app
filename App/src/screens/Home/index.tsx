import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { dataRooms } from '../../../mockdata';
import Filter from './Components/Filter';
import Search from './Components/Search';
import ExploreHeader from '@/components/ExploreHeader';
import Listing from '@/components/Listing';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
type Props = NativeStackScreenProps<RootStackParams>;
const Home = ({ navigation }: Props) => {
	const [isOpenSearch, setOpenSearch] = useState(false);
	const [isOpenFilter, setOpenFilter] = useState(false);

	const toggleSheetSearch = () => {
		setOpenSearch((prev) => !prev);
	};
	const toggleSheetFilter = () => {
		setOpenFilter((prev) => !prev);
	};

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
					{dataRooms?.map((dataRoom, index) => (
						<Listing
							key={index}
							data={dataRoom}
							name={dataRoom.id}
							onPress={(name) => {
								navigation.navigate('Room', { name });
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
