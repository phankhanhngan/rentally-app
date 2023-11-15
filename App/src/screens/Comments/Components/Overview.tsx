import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const OverView = () => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					marginTop: 40,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					marginBottom: 24,
					gap: 4,
				}}
			>
				<Icon4 name="livestream" size={46} color={'#2F2828'} />
				<Text
					style={{
						fontSize: 80,
						fontWeight: '800',
						marginBottom: 24,
						color: '#2F2828',
					}}
				>
					4.94
				</Text>
				<Icon4
					name="livestream"
					color={'#2F2828'}
					size={46}
					style={{ transform: [{ scaleX: -1 }] }}
				/>
			</View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 24 }}
				scrollEventThrottle={16}
				style={{
					padding: 12,
					borderTopWidth: 0.5,
					paddingBottom: 32,
					borderColor: '#5E5D5E',
					borderBottomWidth: 0.5,
				}}
			>
				<View
					style={{
						borderRightWidth: 0.5,
						borderColor: '#5E5D5E',
						paddingHorizontal: 16,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
						}}
					>
						Clean rate
					</Text>

					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
							marginBottom: 24,
						}}
					>
						4.9
					</Text>
					<Icon name="spray-can" size={32} color={'#000'} />
				</View>
				<View
					style={{
						borderRightWidth: 0.5,
						borderColor: '#5E5D5E',
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
						}}
					>
						Location rate
					</Text>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
							marginBottom: 24,
						}}
					>
						4.9
					</Text>
					<Icon3 name="location" size={32} color={'#000'} />
				</View>
				<View
					style={{
						borderRightWidth: 0.5,
						borderColor: '#5E5D5E',
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
						}}
					>
						Security rate
					</Text>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
							marginBottom: 24,
						}}
					>
						4.9
					</Text>
					<Icon2 name="security" size={32} color={'#000'} />
				</View>
				<View
					style={{
						paddingHorizontal: 12,
					}}
				>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
						}}
					>
						Support rate
					</Text>
					<Text
						style={{
							color: '#000',
							fontWeight: '500',
							fontSize: 16,
							marginBottom: 24,
						}}
					>
						4.9
					</Text>
					<Icon2 name="support-agent" size={32} color={'#000'} />
				</View>
			</ScrollView>
		</View>
	);
};

export default OverView;
