import React, { useEffect } from 'react';

import 'react-native-gesture-handler';
import { initializeState } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hook';
import ForgotPassword from '@/screens/ForgotPassword';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Map from '@/screens/Map';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@/screens/Profile';
export type RootStackParams = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	ResetPassword: { email: string };
	Home: undefined;
	Profile: undefined;
	Main: undefined;
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
			<Tab.Navigator>
				<Tab.Screen
					name="Profile"
					component={Profile}
					options={{
						tabBarLabel: 'Home',
						tabBarLabelStyle: { color: '#008E97' },
					}}
				/>
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						tabBarLabel: 'Home',
						tabBarLabelStyle: { color: '#008E97' },
						headerShown: false,
					}}
				/>
			</Tab.Navigator>
		);
	}
	// function DrawerTabs() {
	// 	return (
	// 		<Drawer.Navigator>
	// 			<Drawer.Screen name="Profile" component={Profile} />
	// 			<Drawer.Screen name="Home" component={Home} />
	// 		</Drawer.Navigator>
	// 	);
	// }
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
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default StackNavigator;
