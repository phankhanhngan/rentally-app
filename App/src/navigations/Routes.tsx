import React from 'react';

import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Define the types for your navigation parameters
type RootStackParamList = {
	Login: undefined;
	Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{AuthStack(Stack)}
				{/* {MainStack(Stack)} */}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
