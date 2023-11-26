import React from 'react';
import { Text, View } from 'react-native';

import BasicInput from '@/components/BasicInput';
import DateInput from '@/components/DateInput';
import type { FormikErrors } from 'formik';
// import Dropdown from '@/components/Dropdown';

const PersonalInformation = ({
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
		<View
			style={{
				paddingHorizontal: 24,
				paddingBottom: 16,
				gap: 12,
			}}
		>
			<Text style={{ fontWeight: '800', fontSize: 24, color: '#000' }}>
				Personal information
			</Text>
			<View
				style={{
					backgroundColor: '#F0F0F0',
					padding: 12,
					borderRadius: 8,
				}}
			>
				<Text style={{}}>
					· These information will be used to prepare the digital
					contract, please help to provide correct information
				</Text>
				<Text style={{}}>
					· The contract then will be proceeded by the host
				</Text>
				<Text style={{}}>
					· You will be informed when the host accept your
					confirmation
				</Text>
			</View>
			<BasicInput
				label="Phone"
				value={values.phone}
				name="phone"
				setFieldValue={setFieldValue}
			/>
			<DateInput
				label="Birthday"
				value={values.birthday}
				name="birthday"
				setFieldValue={setFieldValue}
			/>
			<BasicInput
				label="Identity number"
				value={values.identityNumber}
				name="identityNumber"
				setFieldValue={setFieldValue}
			/>
			<DateInput
				label="Identity date of issue"
				value={values.identityDateOfIssue}
				name="identityDateOfIssue"
				setFieldValue={setFieldValue}
			/>
			<BasicInput
				label="Identity place of issue"
				value={values.identityPlaceOfIssue}
				name="identityPlaceOfIssue"
				setFieldValue={setFieldValue}
			/>

			{/* <Dropdown /> */}
		</View>
	);
};

export default PersonalInformation;
