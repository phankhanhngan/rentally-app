import React from 'react';
import { Text, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SlideInDown } from 'react-native-reanimated';

import DateInput from '@/components/DateInput';
import Dropdown from '@/components/Dropdown';
import type { FormikErrors } from 'formik';

const leaseTermData = [
	{ name: '3 months', code: '3' },
	{ name: '6 months', code: '6' },
	{ name: '9 months', code: '9' },
	{ name: '12 months', code: '12' },
];

const tenantsData = [
	{ name: '1 tenant', code: '1' },
	{ name: '2 tenants', code: '2' },
	{ name: '3 tenants', code: '3' },
	{ name: '4 tenants', code: '4' },
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
