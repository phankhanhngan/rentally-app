import type { FC } from 'react';
import React from 'react';
import {
	Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/Ionicons';

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
				<View style={styles.actionRow}>
					<TouchableOpacity
						style={{ flex: 1 }}
						activeOpacity={0.7}
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
								<Text
									style={{
										color: '#5E5D5E',
										fontFamily: 'mon',
									}}
								>
									Provinces · District
								</Text>
							</View>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.filterBtn}
						onPress={onFilterPress}
					>
						<Icon2 name="options" size={24} color={'#000'} />
					</TouchableOpacity>
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
	},
	actionRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		paddingBottom: 16,
		gap: 12,
	},

	searchBtn: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		gap: 10,
		padding: 8,
		paddingHorizontal: 20,
		alignItems: 'center',
		width: '100%',
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
