import { redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { env } from '$env/dynamic/private';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString().trim() ?? '';

		if (!email) return { message: 'Please enter your email address' };

		try {
			await auth.api.requestPasswordReset({
				body: { email, redirectTo: `${env.ORIGIN}/reset-password` }
			});
		} catch (error) {
			// Only surface validation problems (e.g. malformed email). Anything else is
			// swallowed so the response never reveals whether an account exists.
			if (error instanceof APIError && error.status === 'BAD_REQUEST') {
				return { message: error.message || 'Please enter a valid email address' };
			}
			console.error('Password reset request failed', error);
		}

		// Same response whether or not the email is registered.
		return { success: true, email };
	}
};
