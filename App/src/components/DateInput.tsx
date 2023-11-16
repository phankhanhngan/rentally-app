import React from 'react';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

export default ({ label = 'Move in date' }: { label: string }) => {
	const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

	const today = new Date();
	today.setDate(today.getDate() + 1);
	const startDate = getFormatedDate(today, 'YYYY/MM/DD');

	const [selectedStartDate, setSelectedStartDate] = useState('');
	const [startedDate, setStartedDate] = useState('12/12/2023');

	function handleChangeStartDate(propDate: string) {
		setStartedDate(propDate);
	}

	const handleOnPressStartDate = () => {
		setOpenStartDatePicker(!openStartDatePicker);
	};

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<View
				style={{
					width: '100%',
				}}
			>
				<Text
					style={{
						color: '#000',
						fontWeight: '500',
						fontSize: 16,
					}}
				>
					{label}
				</Text>

				<TouchableOpacity
					style={styles.inputBtn}
					onPress={handleOnPressStartDate}
				>
					<Text>{selectedStartDate}</Text>
				</TouchableOpacity>
			</View>

			{/* Create modal for date picker */}
			<Modal
				animationType="slide"
				transparent={true}
				visible={openStartDatePicker}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<DatePicker
							mode="calendar"
							minimumDate={startDate}
							selected={startedDate}
							onDateChange={handleChangeStartDate}
							onSelectedChange={(date: string) =>
								setSelectedStartDate(date)
							}
							options={{
								backgroundColor: '#fff',
								textHeaderColor: '#E36414',
								textDefaultColor: '#000',
								selectedTextColor: '#000',
								mainColor: '#E36414',
								textSecondaryColor: '#000',
								borderColor: 'rgba(122, 146, 165, 0.1)',
							}}
						/>

						<TouchableOpacity onPress={handleOnPressStartDate}>
							<Text style={{ color: 'black' }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	inputBtn: {
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#5E5D5E',
		height: 50,
		paddingLeft: 8,
		fontSize: 18,
		justifyContent: 'center',
		marginTop: 12,
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		padding: 35,
		width: '90%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
