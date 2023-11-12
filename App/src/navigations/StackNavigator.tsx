import React, { useEffect } from 'react';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/EvilIcons';
import Icon3 from 'react-native-vector-icons/Feather';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import 'react-native-gesture-handler';
import ExploreHeader from '@/components/ExploreHeader';
import { initializeState } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hook';
import CheckList from '@/screens/CheckList';
import ForgotPassword from '@/screens/ForgotPassword';
import Home from '@/screens/Home';
import ListingDetail from '@/screens/ListingDetail';
import Login from '@/screens/Login';
import MyRental from '@/screens/MyRental';
import Profile from '@/screens/Profile';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export type RootStackParams = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	ResetPassword: { email: string };
	Home: undefined;
	RoomsStack: NavigatorScreenParams<RoomsStackParams>;
	Profile: undefined;
	Main: undefined;
	Room: {
		name: string;
	};
};

export type RoomsStackParams = {
	Rooms: undefined;
	Room: {
		name: string;
	};
};

const RoomsStack = createNativeStackNavigator<RoomsStackParams>();

const RoomsScreenStack = () => {
	return (
		<RoomsStack.Navigator
			initialRouteName="Rooms"
			screenOptions={{
				headerShown: false,
			}}
		>
			<RoomsStack.Screen
				name="Rooms"
				component={Home}
				options={{
					headerShown: true,

					header: () => <ExploreHeader />,
				}}
			/>
			<RoomsStack.Screen
				name="Room"
				component={ListingDetail}
				options={{
					headerShown: true,
				}}
			/>
		</RoomsStack.Navigator>
	);
};
const StackNavigator = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initializeState());
	}, []);
	const Stack = createNativeStackNavigator<RootStackParams>();
	const Tab = createBottomTabNavigator();
	// const Drawer = createDrawerNavigator();
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
					name="Home"
					component={RoomsScreenStack}
					options={{
						headerShown: false,
						tabBarIcon: ({ size, color }) => (
							<Icon3 name="home" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="CheckList"
					component={CheckList}
					options={{
						tabBarIcon: ({ color }) => (
							<Icon name="heart-o" size={24} color={color} />
						),
					}}
				/>
				<Tab.Screen
					name="MyRental"
					component={MyRental}
					options={{
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
			<Stack.Navigator>
				<Stack.Screen
					name="Main"
					component={BottomTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					component={Register}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Login"
					component={Login}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="ForgotPassword"
					component={ForgotPassword}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="ResetPassword"
					component={ResetPassword}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="RoomsStack"
					component={RoomsScreenStack}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackNavigator;
