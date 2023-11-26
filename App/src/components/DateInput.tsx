import React from 'react';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

import type { FormikErrors } from 'formik';
import { ErrorMessage } from 'formik';

export default ({
	label = 'Move in date',
	setFieldValue,
	value,
	name,
}: {
	name: string;
	label: string;
	value: string;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined,
	) => Promise<void | FormikErrors<any>>;
}) => {
	const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

	const today = new Date();
	today.setDate(today.getDate() + 1);
	const startDate = getFormatedDate(today, 'YYYY/MM/DD');
	const handleOnPressStartDate = () => {
		setOpenStartDatePicker(!openStartDatePicker);
	};
	return (
		<Animated.View
			entering={SlideInDown.springify().damping(15)}
			exiting={SlideOutDown}
			style={{ flex: 1, alignItems: 'center' }}
		>
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
					<Text>{value}</Text>
				</TouchableOpacity>
				<ErrorMessage
					name={name || ''}
					render={(msg) => (
						<Text
							style={{
								top: 86,
								left: 10,
								fontSize: 10,
								color: 'red',
								position: 'absolute',
							}}
						>
							{msg}
						</Text>
					)}
				/>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={openStartDatePicker}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						{name === 'moveInDate' ? (
							<DatePicker
								mode="calendar"
								minimumDate={startDate}
								onDateChange={(newDate) => {
									setFieldValue(name, newDate);
								}}
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
						) : (
							<DatePicker
								mode="calendar"
								maximumDate={startDate}
								onDateChange={(newDate) => {
									setFieldValue(name, newDate);
								}}
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
						)}

						<TouchableOpacity onPress={handleOnPressStartDate}>
							<Text style={{ color: 'black' }}>Close</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</Animated.View>
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
