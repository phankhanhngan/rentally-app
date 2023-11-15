import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';

const BackButton = ({ onPress }: any) => (
	<View
		style={{
			position: 'absolute',
			top: 20,
			left: 20,
			zIndex: 2,
		}}
	>
		<TouchableOpacity
			onPress={onPress}
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					backgroundColor: '#fff',
					width: 32,
					height: 32,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 20,
				}}
			>
				<Icon2 name="arrowleft" color="#000" size={18} />
			</View>
		</TouchableOpacity>
	</View>
);
export default BackButton;
