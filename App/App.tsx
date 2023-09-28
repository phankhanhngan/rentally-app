import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import StackNavigator from './src/navigations/StackNavigator';
import { store } from './src/redux/store';

const App = () => {
	return (
		<Provider store={store}>
			<StackNavigator />
		</Provider>
	);
};

export default App;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
