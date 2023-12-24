import { WEB_CLIENT_ID } from '@env';
import auth from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: WEB_CLIENT_ID,
});

type UnknownObject = Record<string, never>;

export const signInWithGoogle = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();
		// console.log(userInfo);
		// const googleCredential = auth.GoogleAuthProvider.credential(
		// 	userInfo.idToken,
		// );
		// // console.log(googleCredential);
		// const userCredential = await auth().signInWithCredential(
		// 	googleCredential,
		// );
		// console.log(userCredential);

		return userInfo;
	} catch (error) {
		const err = error as UnknownObject;
		if (err.code === statusCodes.SIGN_IN_CANCELLED) {
			console.debug('Cancelled sign in');
		} else if (err.code === statusCodes.IN_PROGRESS) {
			console.debug('Sign in in progress');
		} else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.debug('Play services not available');
		} else {
			console.debug('Unknown error', err);
		}
	}
};
