import { creatApiWithAuth } from '../apiWithAuth.service';
import type {
	IAccounRegister,
	IAccountLogin,
	IAuthResponse,
	IEmail,
	INewPassword,
	IVerifyCode,
} from '@/interfaces/auth.interface';
const creatApiAuthWithAuth = creatApiWithAuth('AuthApi', ['Auth']);

export const authApi = creatApiAuthWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<IAuthResponse, IAccountLogin>({
			query: (body) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
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
			{ accessToken: string }
		>({
			query: (body) => ({
				url: '/auth/google/callback',
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
