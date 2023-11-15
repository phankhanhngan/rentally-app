import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import OverView from './Components/OverView';
import PersonalInformation from './Components/PersonalInformation';
import RentalInformation from './Components/RentalInformation';
import BackButton from '@/components/BackButton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

const PrepareContract = ({ navigation }: Props) => {
	const BackHandler = () => {
		navigation.pop();
	};

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar backgroundColor={'#0C0F14'} />
			<BackButton onPress={BackHandler} />

			<View style={{ position: 'relative' }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 100 }}
					scrollEventThrottle={16}
				>
					<Text
						style={{
							fontWeight: '500',
							fontSize: 20,
							color: '#000',
							marginTop: 20,
							marginLeft: 80,
						}}
					>
						Prepare contract
					</Text>
					<OverView />
					<View
						style={{
							height: StyleSheet.hairlineWidth,
							backgroundColor: '#5E5D5E',
							marginVertical: 16,
							marginHorizontal: 12,
						}}
					/>
					<RentalInformation />
					<View
						style={{
							height: StyleSheet.hairlineWidth,
							backgroundColor: '#5E5D5E',
							marginVertical: 16,
							marginHorizontal: 12,
						}}
					/>
					<PersonalInformation />
				</ScrollView>
			</View>
		</View>
	);
};

export default PrepareContract;
