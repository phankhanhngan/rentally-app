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
					paddingTop: 40,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					paddingBottom: 24,
					gap: 12,
					backgroundColor: '#F8F8F8',
				}}
			>
				<Icon4 name="livestream" size={46} color={'#1D5868'} />
				<Text
					style={{
						fontSize: 80,
						fontWeight: '700',
						marginBottom: 24,
						color: '#E36414',
					}}
				>
					4.94
				</Text>
				<Icon4
					name="livestream"
					color={'#1D5868'}
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
					backgroundColor: '#F8F8F8',
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
					<Icon name="spray-can" size={32} color={'#E36414'} />
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
					<Icon3 name="location" size={32} color={'#E36414'} />
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
					<Icon2 name="security" size={32} color={'#E36414'} />
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
					<Icon2 name="support-agent" size={32} color={'#E36414'} />
				</View>
			</ScrollView>
		</View>
	);
};

export default OverView;
