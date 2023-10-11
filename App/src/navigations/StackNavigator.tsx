import React, { useEffect } from 'react';

import 'react-native-gesture-handler';
import { initializeState } from '@/redux/features/auth/auth.slice';
import { useAppDispatch } from '@/redux/hook';
import ForgotPassword from '@/screens/ForgotPassword';
import Home from '@/screens/Home';
import Login from '@/screens/Login';
import Profile from '@/screens/Profile';
import Register from '@/screens/Register';
import ResetPassword from '@/screens/ResetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParams = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	ResetPassword: undefined;
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
