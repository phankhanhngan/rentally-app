import { createApiWithAuth } from '../apiWithAuth.service';
import type {
	IAccounRegister,
	IAccountLogin,
	IAuthResponse,
	IEmail,
	INewPassword,
	IVerifyCode,
} from '@/interfaces/auth.interface';
const createApiAuthWithAuth = createApiWithAuth('AuthApi', ['Auth', 'Rental']);

export const authApi = createApiAuthWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<IAuthResponse, IAccountLogin>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: [{ type: 'Rental' }],
		}),
		register: builder.mutation<IAuthResponse, IAccounRegister>({
			query: (body) => {
				return {
					url: '/auth/register',
					method: 'post',
					body,
				};
			},
		}),
		registerVerification: builder.mutation<IAuthResponse, IVerifyCode>({
			query: (body) => ({
				url: '/auth/register/verify',
				method: 'POST',
				body,
			}),
		}),
		resendEmail: builder.mutation<IAuthResponse, IEmail>({
			query: (body) => ({
				url: '/auth/resend-verification',
				method: 'POST',
				body,
			}),
		}),
		forgotPassword: builder.mutation<IAuthResponse, IEmail>({
			query: (body) => ({
				url: '/auth/forgot-password',
				method: 'POST',
				body,
			}),
		}),
		forgotPasswordVerify: builder.mutation<IAuthResponse, IVerifyCode>({
			query: (body) => ({
				url: '/auth/forgot-password/verify',
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation<IAuthResponse, INewPassword>({
			query: (body) => ({
				url: '/auth/reset-password',
				method: 'POST',
				body,
			}),
		}),
		continueWithGG: builder.mutation<
			IAuthResponse,
			{
				id: string;
				familyName: string;
				givenName: string;
				email: string;
				photo: string;
			}
		>({
			query: (body) => ({
				url: '/auth/firebase/callback',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useRegisterMutation,
	useRegisterVerificationMutation,
	useForgotPasswordMutation,
	useForgotPasswordVerifyMutation,
	useResendEmailMutation,
	useResetPasswordMutation,
	useContinueWithGGMutation,
} = authApi;
