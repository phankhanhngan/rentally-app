import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconEvil from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

type OptionSettingsProps = {
	icon: string;
	content: string;
	iconName: string;
	event?: () => void;
};

const OptionSettings: React.FC<OptionSettingsProps> = ({
	icon,
	content,
	iconName,
	event,
}) => {
	return (
		<TouchableOpacity onPress={event}>
			<View style={styles.container_settings}>
				<View style={styles.options}>
					{iconName === 'Icon' ? (
						<Icon style={styles.icon} name={icon} size={24} />
					) : iconName === 'IconEvil' ? (
						<IconEvil style={styles.icon} name={icon} size={24} />
					) : (
						<IconFeather
							style={styles.icon}
							name={icon}
							size={24}
						/>
					)}
					<Text style={styles.content}>{content}</Text>
				</View>
				<IconMaterialCommunity name="greater-than" size={18} />
			</View>
		</TouchableOpacity>
	);
};

export default OptionSettings;

const styles = StyleSheet.create({
	container_settings: {
		backgroundColor: 'white',
		borderBottomWidth: 1.5,
		borderBottomColor: '#F1EFEF',
		padding: 2,
		paddingBottom: 16,
		paddingTop: 16,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	options: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		marginRight: 8,
	},
	content: {
		fontSize: 18,
		color: 'grey',
	},
});
