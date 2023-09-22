import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import Routes from './src/navigations/Routes';
import { store } from './src/redux/store';

const App = () => {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	);
};

export default App;
