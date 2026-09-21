import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';
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
		const email = formData.get('email')?.toString() ?? '';
		const password = formData.get('password')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';

		try {
			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name
				}
			});

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
