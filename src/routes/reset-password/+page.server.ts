import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

// Better Auth verifies the emailed link, then redirects here with either
// ?token=... (valid) or ?error=INVALID_TOKEN (expired / already used / tampered).
export const load: PageServerLoad = ({ url }) => {
	const token = url.searchParams.get('token');
	return { token, invalid: !token || url.searchParams.has('error') };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('token')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const confirm = formData.get('confirm')?.toString() ?? '';

		if (password !== confirm) return { message: "Passwords don't match" };

		try {
			await auth.api.resetPassword({ body: { newPassword: password, token } });
			return { success: true };
		} catch (error) {
			if (error instanceof APIError) {
				return { message: error.message || 'Could not reset password' };
			}
			console.error('Password reset failed', error);
			return { message: 'Unexpected error' };
		}
	}
};
