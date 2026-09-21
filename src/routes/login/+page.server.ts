import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = (event) => {
	if (event.locals.user) {
		return redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';

		console.log({ email, password });
		try {
			await auth.api.signInEmail({
				body: {
					email,
					password
				}
			});
			return {
				success: true
			};
		} catch (error) {
			console.log({ error });
			if (error instanceof APIError) {
				return {
					message: error.message || 'Registration failed'
				};
			}
			return { message: 'Unexpected error' };
		}
	}
};
