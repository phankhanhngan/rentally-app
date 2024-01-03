import React from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import type { IUser } from '@/interfaces/user.interface';
import { useAppSelector } from '@/redux/hook';

interface HeartButtonProps {
	isInCheckList: boolean;
	handleClickHeartButton: any;
}

const HeartButton: React.FC<HeartButtonProps> = ({
	isInCheckList,
	handleClickHeartButton,
}) => {
	const [hasFavorited, setHasFavorited] = useState(isInCheckList);
	const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser;

	return (
		<TouchableOpacity
			onPress={() => {
				handleClickHeartButton();
				if (userInfo) setHasFavorited((state: any) => !state);
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
