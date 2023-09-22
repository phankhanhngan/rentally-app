import React from 'react';

import Login from '../screens/Login';
import Register from '../screens/Register';

export default function (Stack) {
	return (
		<>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
		</>
	);
}
