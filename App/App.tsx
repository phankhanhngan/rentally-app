import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';

import 'react-native-gesture-handler';
import StackNavigator from './src/navigations/StackNavigator';
import { store } from './src/redux/store';

const App = () => {
	console.log()
	useEffect(() => {
		if (Platform.OS === 'android') SplashScreen.hide();
	}, []);
	return (
		<Provider store={store}>
			<StackNavigator />
		</Provider>
	);
};

export default App;
