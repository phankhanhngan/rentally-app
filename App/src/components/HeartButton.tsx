import React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface HeartButtonProps {
	isInCheckList: boolean;
	handleClickHeartButton: any;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	isInCheckList,
	handleClickHeartButton,
}) => {
	const [hasFavorited, setHasFavorited] = useState(isInCheckList);

	return (
		<TouchableOpacity
			onPress={() => {
				setHasFavorited((state: any) => !state);
				handleClickHeartButton();
			}}
		>
			<Icon
				name="heart-o"
				color={'black'}
				size={18}
				style={{
					opacity: 1,
				}}
			/>
			<Icon
				size={18}
				name="heart"
				color={hasFavorited ? '#f43f5e' : 'white'}
				style={{ position: 'absolute', zIndex: hasFavorited ? 1 : -1 }}
			/>
		</TouchableOpacity>
	);
};

export default HeartButton;
