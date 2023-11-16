import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { dataRooms } from '../../../mockdata';
import Listing from '@/components/Listing';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;
const Home = ({ navigation }: Props) => {
	return (
		<GestureHandlerRootView style={styles.screenContainer}>
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
