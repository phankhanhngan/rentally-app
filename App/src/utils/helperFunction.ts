import { showMessage } from 'react-native-flash-message';

const showError = (message: string) => {
	showMessage({
		type: 'danger',
		icon: 'danger',
		message,
	});
};

const showSuccess = (message: string) => {
	showMessage({
		type: 'success',
		icon: 'success',
		message,
	});
};

export { showError, showSuccess };
