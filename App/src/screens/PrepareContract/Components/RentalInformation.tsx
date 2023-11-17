import React from 'react';
import { Text, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SlideInDown } from 'react-native-reanimated';

import DateInput from '@/components/DateInput';
import Dropdown from '@/components/Dropdown';
import type { FormikErrors } from 'formik';

const leaseTermData = [
	{ label: '3 months', value: '3' },
	{ label: '6 months', value: '6' },
	{ label: '9 months', value: '9' },
	{ label: '12 months', value: '12' },
];

const tenantsData = [
	{ label: '1 tenant', value: '1' },
	{ label: '2 tenants', value: '2' },
	{ label: '3 tenants', value: '3' },
	{ label: '4 tenants', value: '4' },
];

const RentalInformation = ({
	values,
	setFieldValue,
}: {
	values: any;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined,
	) => Promise<void | FormikErrors<any>>;
}) => {
	return (
		<Animated.View
			style={{
				paddingHorizontal: 24,
				paddingBottom: 16,
				gap: 12,
			}}
			entering={SlideInDown}
		>
			<Text style={{ fontWeight: '800', fontSize: 24, color: '#000' }}>
				Rental information
			</Text>
			<DateInput
				label="Move in date"
				value={values.moveInDate}
				name="moveInDate"
				setFieldValue={setFieldValue}
			/>
			<Dropdown
				data={leaseTermData}
				label="Lease term"
				value={values.numberOfTenants}
				name="numberOfTenants"
				setFieldValue={setFieldValue}
			/>
			<Dropdown
				data={tenantsData}
				label="Number of tenants"
				value={values.leaseTerm}
				name="leaseTerm"
				setFieldValue={setFieldValue}
			/>
		</Animated.View>
	);
};

export default RentalInformation;
