import type { FC } from 'react';
import React from 'react';
import {
	Image,
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';

import Logo from '../assets/images/Logo.svg';
interface ExploreHeaderProps {
	onSearchPress?: () => void;
	onFilterPress?: () => void;
}

const ExploreHeader: FC<ExploreHeaderProps> = ({
	onFilterPress,
	onSearchPress,
}) => {
	return (
		<SafeAreaView style={{ height: 80, backgroundColor: '#fff' }}>
			<View style={styles.container}>
				<View
					style={{
						paddingLeft: 22,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: -20,
						gap: 0,
						paddingRight: 16,
					}}
				>
					<Image
						source={require('../assets/images/rentallyLogo.png')}
						style={{
							width: 40,
							height: 40,
						}}
					/>
					<Logo
						width={80}
						height={40}
						style={{
							marginTop: 5,
							marginLeft: -10,
						}}
					/>
				</View>
				<View style={styles.actionRow}>
					<Pressable
						style={({ pressed }) => [
							{ flex: 1 },
							{ opacity: pressed ? 0.7 : 1 }, // Adjust opacity based on press state
						]}
						// activeOpacity={0.7}
						onPress={onSearchPress}
					>
						<View style={styles.searchBtn}>
							<Icon2 name="search" size={24} color={'#000'} />
							<View>
								<Text
									style={{
										fontFamily: 'mon-sb',
										fontWeight: '700',
										color: '#000',
									}}
								>
									Where to?
								</Text>
							</View>
						</View>
					</Pressable>

					<Pressable
						style={({ pressed }) => [
							styles.filterBtn,
							{ opacity: pressed ? 0.7 : 1 }, // Adjust opacity based on press state
						]}
						onPress={onFilterPress}
					>
						<Icon2 name="options" size={24} color={'#000'} />
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: 12,
		backgroundColor: '#fff',
		elevation: 2,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: {
			width: 1,
			height: 10,
		},
		zIndex: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	actionRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingRight: 24,
		paddingBottom: 16,
		gap: 12,
	},

	searchBtn: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		gap: 10,
		paddingVertical: 12,
		alignItems: 'center',
		paddingLeft: 10,

		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#c2c2c2',
		borderRadius: 30,
		elevation: 2,
		shadowColor: '#000',
		shadowOpacity: 0.12,
		shadowRadius: 8,
		shadowOffset: {
			width: 1,
			height: 1,
		},
	},
	filterBtn: {
		padding: 10,
		borderWidth: 1,
		borderColor: '#c2c2c2',
		borderRadius: 24,
	},
	categoryText: {
		fontSize: 14,
		fontFamily: 'mon-sb',
		color: '#5E5D5E',
	},
	categoryTextActive: {
		fontSize: 14,
		fontFamily: 'mon-sb',
		color: '#000',
	},
	categoriesBtn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 8,
	},
	categoriesBtnActive: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: '#000',
		borderBottomWidth: 2,
		paddingBottom: 8,
	},
});

export default ExploreHeader;
