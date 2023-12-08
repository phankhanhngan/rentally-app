import React, { useState } from 'react';
import { Button, Modal, View } from 'react-native';
import WebView from 'react-native-webview';

const YourComponent = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<Button
				title="Open WebView"
				onPress={() => setModalVisible(true)}
			/>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<WebView
					source={{
						uri: 'https://checkout.stripe.com/c/pay/cs_test_a1wZWNgBAMjYGTLT1m8f17vPkNqi8s23gHhsbWIl9v7GuW4UEwWaT3A8Tg#fidkdWxOYHwnPyd1blpxYHZxWjA0SkdBTWpJdk42PTRNbVR9TmRRbFY1QUwwTXJgV0MwbF02NXJ0aW5UT0g0fVxcc05LR3FxMkMxTVdvS25AcWw3fWNtPXx9RHw0fXQ8Q05BdzVvYmZmUkQxNTVATV1pUjZpdycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl',
					}}
				/>
				<Button
					title="Close WebView"
					onPress={() => setModalVisible(false)}
				/>
			</Modal>
		</View>
	);
};

export default YourComponent;
