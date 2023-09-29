import { creatApiWithAuth } from '../apiWithAuth.service';

const creatApiAuthWithAuth = creatApiWithAuth('AuthApi', ['Auth']);

export const authApi = creatApiAuthWithAuth.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body: { email: string; password: string }) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),
		register: builder.mutation({
			query: (body: {
				firstName: string;
				email: string;
				password: string;
				lastName: string;
				phoneNumber: string;
				role: string;
			}) => {
				return {
					url: '/auth/register',
					method: 'post',
					body,
				};
			},
		}),
		registerVerification: builder.mutation({
			query: (body: { email: string; code: string }) => ({
				url: '/auth/verify',
				method: 'POST',
				body,
			}),
		}),
		resendEmail: builder.mutation({
			query: (body: { email: string }) => ({
				url: '/auth/resend-verification',
				method: 'POST',
				body,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (body: { email: string }) => ({
				url: '/auth/forgot-password',
				method: 'POST',
				body,
			}),
		}),
		forgotPasswordVerify: builder.mutation({
			query: (body: { email: string; code: string }) => ({
				url: '/auth/forgot-password/verify',
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation({
			query: (body: {
				email: string;
				password: string;
				code: string;
			}) => ({
				url: '/auth/reset-password',
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
} = authApi;
