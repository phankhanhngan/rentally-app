import React from 'react';
import {
	Alert,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import OverView from './Components/OverView';
import PersonalInformation from './Components/PersonalInformation';
import RentalInformation from './Components/RentalInformation';
import BackButton from '@/components/BackButton';
import type { RootStackParams } from '@/navigations/StackNavigator';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<RootStackParams, 'PrepareContract'>;
import Spinner from 'react-native-loading-spinner-overlay';

import { useCreateRentalMutation } from '@/redux/services/rental/rental.service';
import { formatDate } from '@/utils/helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
const PrepareContract = ({ navigation, route }: Props) => {
	const { id, overView } = route?.params || {};
	const [createRental, { isLoading }] = useCreateRentalMutation();
	const initialRentalValues = {
		phone: '',
		identityNumber: '',
		identityDateOfIssue: '',
		identityPlaceOfIssue: '',
		birthday: '',
		leaseTerm: '',
		moveInDate: '',
		numberOfTenants: '',
	};

	const RentalSchema = Yup.object().shape<Record<string, any>>({
		leaseTerm: Yup.string().required('Lease term Required!'),
		moveInDate: Yup.string().required('Move in date Required!'),
		numberOfTenants: Yup.string().required('Number of tenants Required!'),

		identityNumber: Yup.string().required('identity number Required!'),
		identityDateOfIssue: Yup.string().required(
			'identity date of issue Required!',
		),
		identityPlaceOfIssue: Yup.string().required(
			'identity place of issue Required!',
		),
		birthday: Yup.string().required('Birthday is reqired!'),
		phone: Yup.string()
			.matches(
				/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
				'Invalid phone number',
			)
			.required('Number phone must be required!'),
	});
	const submitRentalForm = async (values: any) => {
		const rentalInfo = {
			roomId: id,
			tenantInfo: {
				identityNumber: values.identityNumber,
				identityDateOfIssue: formatDate(values.identityDateOfIssue),
				identityPlaceOfIsse: values.identityPlaceOfIssue,
				birthday: formatDate(values.birthday),
				phoneNumber: values.phone,
			},
			rentalInfo: {
				leaseTerm: parseInt(values.leaseTerm, 10),
				moveInDate: formatDate(values.moveInDate),
				numberOfTenants: parseInt(values.numberOfTenants, 10),
			},
		};
		console.log(rentalInfo);
		try {
			const res = await createRental({ data: rentalInfo }).unwrap();
			console.log('res:', res);
			if (res.status === 'success' || res.success == true) {
				navigation.navigate('Main');
			}
		} catch (error: any) {
			console.log(error);
			Alert.alert('error!', error.data.message);
		}
	};

	const BackHandler = () => {
		navigation.pop();
	};

	return (
		<>
			<Spinner visible={isLoading} />
			<Formik
				initialValues={initialRentalValues}
				validationSchema={RentalSchema}
				onSubmit={submitRentalForm}
			>
				{(formik) => {
					const { values, handleSubmit, setFieldValue } = formik;

					return (
						<View style={{ flex: 1, backgroundColor: 'white' }}>
							<StatusBar backgroundColor={'#0C0F14'} />
							<BackButton onPress={BackHandler} />

							<View style={{ position: 'relative' }}>
								<ScrollView
									showsVerticalScrollIndicator={false}
									contentContainerStyle={{
										paddingBottom: 24,
									}}
									scrollEventThrottle={16}
								>
									<Text
										style={{
											fontWeight: '500',
											fontSize: 20,
											color: '#000',
											marginTop: 20,
											marginLeft: 80,
										}}
									>
										Prepare contract
									</Text>
									<OverView overView={overView} />
									<View
										style={{
											height: StyleSheet.hairlineWidth,
											backgroundColor: '#5E5D5E',
											marginVertical: 16,
											marginHorizontal: 12,
										}}
									/>
									<RentalInformation
										values={values}
										setFieldValue={setFieldValue}
									/>
									<View
										style={{
											height: StyleSheet.hairlineWidth,
											backgroundColor: '#5E5D5E',
											marginVertical: 16,
											marginHorizontal: 12,
										}}
									/>
									<PersonalInformation
										values={values}
										setFieldValue={setFieldValue}
									/>
									<TouchableOpacity
										onPress={() => handleSubmit()}
										style={[
											{
												backgroundColor: '#E36414',
												height: 50,
												borderRadius: 8,
												margin: 24,
												marginBottom: 0,
												justifyContent: 'center',
												alignItems: 'center',
											},
											{
												paddingRight: 20,
												paddingLeft: 20,
											},
										]}
									>
										<Text
											style={{
												color: '#fff',
												fontSize: 16,
												fontFamily: 'mon-b',
											}}
										>
											Request rent
										</Text>
									</TouchableOpacity>
								</ScrollView>
							</View>
						</View>
					);
				}}
			</Formik>
		</>
	);
};

export default PrepareContract;
