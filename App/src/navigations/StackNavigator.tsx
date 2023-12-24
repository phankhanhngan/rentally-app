import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Feather';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import 'react-native-gesture-handler';
import BackButton from '@/components/BackButton';
import type { IMyRental } from '@/interfaces/rental.interface';
import type { IRatingDetail } from '@/interfaces/room-detail.interface';
import type { IRoomFinding } from '@/interfaces/roomfinding.interface';
import { initializeState } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hook';
import CheckList from '@/screens/CheckList';
import Comments from '@/screens/Comments';
import ForgotPassword from '@/screens/ForgotPassword';
import Home from '@/screens/Home';
import ListingDetail from '@/screens/ListingDetail';
import Login from '@/screens/Login';
import MyRentalDetail from '@/screens/MyRentalDetail';
import MyRental from '@/screens/MyRentals';
import PaymentList from '@/screens/Payment/PaymentList';
import PrepareContract from '@/screens/PrepareContract';
import type { IOverView } from '@/screens/PrepareContract/Components/OverView';
import Profile from '@/screens/Profile';
import LoginSecurity from '@/screens/ProfileSettings/LoginSecurity';
import Map from '@/screens/ProfileSettings/Map';
import PersonalInformationUpdate from '@/screens/ProfileSettings/PersonalInformation';
import Statistic from '@/screens/ProfileSettings/Statistic';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import { PAYMENTSTATUS, STATUS } from '@/utils/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParams = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	ResetPassword: { email: string };
	Rooms: undefined;
	Main: undefined;
	Comments: { ratingDetail: IRatingDetail };
	PrepareContract: {
		id: string;
		overView: IOverView;
	};
	Rental: { myRental: IMyRental };
	Room: {
		id: string;
	};
	PersonalInformationUpdate: undefined;
	LoginSecurity: undefined;
	Map: { markers: IRoomFinding[] };
	PaymentList: undefined;
	Statistic: undefined;
};
const StackNavigator = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeState());
	}, []);
	const Stack = createNativeStackNavigator<RootStackParams>();
	const Tab = createBottomTabNavigator();
	// const Drawer = createDrawerNavigator();
	const Tab2 = createMaterialTopTabNavigator();
	function MyPaymentTabs() {
		return (
			<Tab2.Navigator
				screenOptions={{
					tabBarScrollEnabled: true,
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIndicatorStyle: { backgroundColor: '#E36414' },
					tabBarActiveTintColor: '#E36414',
					tabBarInactiveTintColor: 'black',
				}}
			>
				<Tab2.Screen
					name={PAYMENTSTATUS.UNPAID}
					children={(props) => (
						<PaymentList {...props} status={PAYMENTSTATUS.UNPAID} />
					)}
				/>
				<Tab2.Screen
					name={PAYMENTSTATUS.PAID}
					children={(props) => (
						<PaymentList {...props} status={PAYMENTSTATUS.PAID} />
					)}
				/>
			</Tab2.Navigator>
		);
	}
	function MyRenTalsTab() {
		return (
			<Tab2.Navigator
				screenOptions={{
					tabBarScrollEnabled: true,
					tabBarLabelStyle: { fontSize: 12 },
					tabBarIndicatorStyle: { backgroundColor: '#E36414' },
					tabBarActiveTintColor: '#E36414',
					tabBarInactiveTintColor: 'black',
				}}
			>
				<Tab2.Screen
					name={STATUS.CREATED}
					children={(props) => (
						<MyRental {...props} status={STATUS.CREATED} />
					)}
				/>
				<Tab2.Screen
					name={STATUS.APPROVED}
					children={(props) => (
						<MyRental {...props} status={STATUS.APPROVED} />
					)}
				/>
				<Tab2.Screen
					name={STATUS.COMPLETED}
					children={(props) => (
						<MyRental {...props} status={STATUS.COMPLETED} />
					)}
				/>
				<Tab2.Screen
					name={STATUS.REQUEST_BREAK}
					children={(props) => (
						<MyRental {...props} status={STATUS.REQUEST_BREAK} />
					)}
				/>
				<Tab2.Screen
					name={STATUS.BROKEN}
					children={(props) => (
						<MyRental {...props} status={STATUS.BROKEN} />
					)}
				/>
				<Tab2.Screen
					name={STATUS.ENDED}
					children={(props) => (
						<MyRental {...props} status={STATUS.ENDED} />
					)}
				/>
				<Tab2.Screen
					name={STATUS.CANCELED}
					children={(props) => (
						<MyRental {...props} status={STATUS.CANCELED} />
					)}
				/>
			</Tab2.Navigator>
		);
	}
	function BottomTabs() {
		return (
			<Tab.Navigator
				screenOptions={{
					tabBarActiveTintColor: '#E36414',
					tabBarLabelStyle: {
						fontFamily: 'mon-sb',
					},
				}}
			>
				<Tab.Screen
					name="Rooms"
					component={Home}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<Icon3 name="home" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="CheckList"
					component={CheckList}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<Icon name="heart-o" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="MyRental"
					component={MyRenTalsTab}
					options={{
						headerShown: true,
						header: () => (
							<Text
								style={{
									backgroundColor: 'white',
									fontWeight: '500',
									fontSize: 26,
									color: '#000',
									paddingTop: 12,
									paddingLeft: 20,
								}}
							>
								My Rentals
							</Text>
						),
						tabBarIcon: ({ color }) => (
							<Icon2 name="profile" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={Profile}
					options={{
						tabBarLabel: 'Profile',

						tabBarIcon: ({ color }) => (
							<Icon4 name="user" size={40} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name="Main"
					component={BottomTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
					options={{ animation: 'slide_from_right' }}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ animation: 'slide_from_right' }}
				/>

				<Stack.Screen
					name="ForgotPassword"
					component={ForgotPassword}
					options={{ animation: 'slide_from_right' }}
				/>
				<Stack.Screen
					name="ResetPassword"
					component={ResetPassword}
					options={{ animation: 'slide_from_right' }}
				/>
				<Stack.Screen
					name="Room"
					component={ListingDetail}
					options={{
						animation: 'slide_from_right',
					}}
				/>

				<Stack.Screen
					name="PrepareContract"
					component={PrepareContract}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="Rental"
					component={MyRentalDetail}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="PersonalInformationUpdate"
					component={PersonalInformationUpdate}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="LoginSecurity"
					component={LoginSecurity}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="Map"
					component={Map}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="Comments"
					component={Comments}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="Statistic"
					component={Statistic}
					options={{
						animation: 'slide_from_right',
					}}
				/>
				<Stack.Screen
					name="PaymentList"
					component={MyPaymentTabs}
					options={({ navigation }) => ({
						headerShown: true,
						animation: 'slide_from_right',
						header: () => (
							<>
								<BackButton onPress={() => navigation.pop()} />
								<Text
									style={{
										backgroundColor: 'white',
										fontWeight: '500',
										fontSize: 26,
										color: '#000',
										paddingTop: 12,
										paddingLeft: 80,
									}}
								>
									My Payments
								</Text>
							</>
						),
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackNavigator;
