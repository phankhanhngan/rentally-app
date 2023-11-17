import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Icon2 from 'react-native-vector-icons/Ionicons';

import BasicInput from '@/components/BasicInput';
import Dropdown from '@/components/Dropdown';
// const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
interface SearchProps {
	onSearchPress?: () => void;
}

const Search = ({ onSearchPress }: SearchProps) => {
	return (
		<Animated.View
			entering={SlideInDown.springify().damping(15)}
			exiting={SlideOutDown}
			style={{
				backgroundColor: 'white',
				padding: 24,
				height: 400,
				width: '100%',
				position: 'absolute',
				bottom: -20 * 1.1,
				borderTopRightRadius: 20,
				borderTopLeftRadius: 20,
				zIndex: 1,
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Text
					style={{
						fontSize: 26,
						fontWeight: '700',
						color: '#000',
						marginBottom: 12,
					}}
				>
					Search
				</Text>
				<TouchableOpacity
					onPress={onSearchPress}
					activeOpacity={0.7}
					style={[
						{
							backgroundColor: '#E36414',
							paddingVertical: 12,
							borderRadius: 30,
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							gap: 2,
						},
						{ paddingRight: 10, paddingLeft: 10 },
					]}
				>
					<Text
						style={{
							color: '#fff',
							fontSize: 16,
							fontFamily: 'mon-b',
						}}
					>
						Search
					</Text>
					<Icon2 name="search" size={20} color={'#fff'} />
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'column', flex: 1, gap: 2 }}>
				{/* <BasicInput label="Keyword" value={''} />
				<Dropdown label="Province" value={''} />
				<Dropdown label="District" value={''} /> */}
			</View>
		</Animated.View>
	);
};

export default Search;
