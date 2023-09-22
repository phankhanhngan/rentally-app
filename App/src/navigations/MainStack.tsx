import React from 'react';

import Detail from '../screens/Detail';
import Home from '../screens/Home';

export default function (Stack) {
	return (
		<>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Detail" component={Detail} />
		</>
	);
}
