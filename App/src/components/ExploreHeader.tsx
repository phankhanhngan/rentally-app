import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const ExploreHeader = () => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.container}>
				<View style={styles.actionRow}>
					<TouchableOpacity>
						<View style={styles.searchBtn}>
							<View>
								<Text style={{ fontFamily: 'mon-sb' }}>
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
					></TouchableOpacity>
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
	},

	searchBtn: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		gap: 10,
		padding: 14,
		alignItems: 'center',
		width: 280,
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
		borderColor: '#A2A0A2',
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
