import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';

import Comment from './Components/Comment';
import OverView from './Components/Overview';
import BackButton from '@/components/BackButton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams>;

const Comments = ({ navigation }: Props) => {
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
					<OverView />
					<Text
						style={{
							margin: 24,
							color: '#000',
							fontWeight: '500',
							fontSize: 24,
						}}
					>
						80 reviews
					</Text>
					<View
						style={{
							marginHorizontal: 24,
							gap: 28,
						}}
					>
						<Comment />
						<Comment />
						<Comment />
						<Comment />
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default Comments;
